'use strict';
// enabling strict mode

function handleMenu(menu, body) {
    // //console.log('called handlemenu');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    }
    else {
        menu.classList.add('hidden');
    }

    if (body.classList.contains('hide-overflow')) {
        body.classList.remove('hide-overflow');
    }
    else {
        body.classList.add('hide-overflow');
    }
}

function updateExpandAllIcon(button, sections) {
    let buttonIcon = button.querySelector('.open_close_icon');

    if (isOneSectionExpanded(sections)) {
        switchExpansionIcon(buttonIcon, true);
    }
    else {
        switchExpansionIcon(buttonIcon, false);
    }
}

function bindExpandAll(button, sections) {  
    // //console.log("bind expand all called") ;
    let icon = button.querySelector('.open_close_icon');

    button.addEventListener('click', event => {
        // //console.log('clicking on expand/collapse all')
        if (isOneSectionExpanded(sections)) {
            // //console.log('one section is expanded');
            closeSections(sections);
            switchExpansionIcon(icon, false);
        }
        else {
            openSections(sections);
            switchExpansionIcon(icon, true);
        }
    })
}

function bindExpansionListeners(expandableGroups, nonMenuExpandable = null, expandAllButton = null) {
    // //console.log("bind expansion listeners called");
    if (expandableGroups[0] != undefined) {
        expandableGroups.forEach(element => {
            element.firstElementChild.addEventListener('click', function(event) {
                if (element.classList.contains('closed')) {
                    openExpandable(element);
                }
                else {
                    closeExpandable(element);
                }

                if (expandAllButton && nonMenuExpandable) {
                    updateExpandAllIcon(expandAllButton, nonMenuExpandable)
                }
            });
        });
    }
    else {
        //console.log("bindExpansion passed empty array");
    }
}

function isOneSectionExpanded(expandableGroups) {
    for (let expandable of expandableGroups) {
        if (!expandable.classList.contains('closed')) {
            return true;
        }
    }

    return false;
}

function closeSections(sections) {
    sections.forEach(element => {
        closeExpandable(element);
    })
}

function openSections(sections) {
    sections.forEach(element => {
        openExpandable(element);
    });
}

function showElement(element) {
    element.classList.remove('hidden');
    switchExpansionIcon(element.querySelector('.open_close_icon'), true);
}

function hideElement(element) {
    element.classList.add('hidden');
    switchExpansionIcon(element.querySelector('.open_close_icon'), false);
}

function openExpandable(section) {
    section.classList.remove('closed');
    switchExpansionIcon(section.querySelector('.open_close_icon'), true);
}

function closeExpandable(section) {
    section.classList.add('closed');
    switchExpansionIcon(section.querySelector('.open_close_icon'), false);
}

function switchExpansionIcon(icon, isExpanding) {
    if (icon) {
        if (isExpanding) {
            //console.log(icon);
            //console.log(`Icon dataset: ${icon.dataset.imageOpen}`);
            if (icon.dataset.imageOpen) {
                //console.log(icon.dataset.imageOpen);

                icon.src = icon.dataset.imageOpen;
            }
            else {
                icon.src = "https://s3.amazonaws.com/static.cosequin.com/ca/google_icons/google_font_close.svg";
            }
        } 
        else {
            //console.log(icon);
            //console.log(`Icon dataset: ${icon.dataset.imageOpen}`);
            if (icon.dataset.imageClose) {
               //console.log(icon.dataset.imageClose);

               icon.src = icon.dataset.imageClose;
            }
            else {
                icon.src = 'https://s3.amazonaws.com/static.cosequin.com/ca/google_icons/google_font_plus.svg';
            }
            
        }
    }
    else {
        //console.log('icon is undefined');
    }
    
}

// These are the actual calls for the script

const expandAllButton = document.querySelector('#expand_collapse_all');
const expandableSections = document.querySelectorAll('.expandable');

if (expandableSections.length != 0) {
    // //console.log("there are expandable sections");

    const nonMenuExpandables = Array();
    expandableSections.forEach(element => {
        if (element.parentElement.id != 'menu') {
            // console.log(`This element ${element} is not a menu item`);
            nonMenuExpandables.push(element);
        }
    });

    if (expandAllButton) {
        bindExpandAll(expandAllButton, nonMenuExpandables);

        

        // console.log(nonMenuExpandables);
        bindExpansionListeners(nonMenuExpandables, expandAllButton);
    }
    else {
        bindExpansionListeners(expandableSections);
    }
}

document.querySelector('#menuButton').addEventListener('click', (event) => 
    {
        handleMenu(document.querySelector('#menu'), document.querySelector('body'))
    }
);