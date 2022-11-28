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
            closeSections(false, sections);
            switchExpansionIcon(icon, false);
        }
        else {
            openSections(sections);
            switchExpansionIcon(icon, true);
        }
    })
}

function bindExpansionListeners(expandableGroups, expandAllButton = null) {
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
                if (expandAllButton) {
                    updateExpandAllIcon(expandAllButton, expandableGroups)
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
        if (expandable.lastElementChild.classList.contains('viewable')) {
            return true;
        }
    }

    return false;
}

function closeSections(shouldOpenFirst, sections) {
    if (shouldOpenFirst) {
        sections.forEach((element, index) => {
            if (index != 0) {
                closeExpandable(element);
            }
            else {
                openExpandable(element);
            }
        })
    }
    else {
        sections.forEach(element => {
            closeExpandable(element);
        })
    }
}

function openSections(sections) {
    sections.forEach(element => {
        openExpansion(element);
    });
}

function showElement(element) {
    element.classList.remove('hidden');
    switchExpansionIcon(element.querySelector('.open_close_icon'), true);
}

function hideElement(element) {
    element.classList.add('closed');
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

let expandAllButton = document.querySelector('#expand_collapse_all');
let expandableSections = document.querySelectorAll('.expandable');

if (expandableSections.length != 0) {
    // //console.log("there are expandable sections");
    if (expandAllButton) {
        bindExpandAll(expandAllButton, expandableSections);
        bindExpansionListeners(expandableSections, expandAllButton);
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