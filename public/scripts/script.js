'use strict';
// enabling strict mode

let handleMenu = (menu, body) => {
    // console.log('called handlemenu');

    if (menu.classList.contains('hidden')) {
        showElement(menu);
    }
    else {
        hideElement(menu);
    }

    if (body.classList.contains('hide-overflow')) {
        body.classList.remove('hide-overflow');
    }
    else {
        body.classList.add('hide-overflow');
    }
}

let updateExpandAllIcon = function(button, sections) {
    let buttonIcon = button.querySelector('.open_close_icon');

    if (isOneSectionExpanded(sections)) {
        switchExpansionIcon(buttonIcon, true);
    }
    else {
        switchExpansionIcon(buttonIcon, false);
    }
}

let bindExpandAll = function(button, sections) {  
    // console.log("bind expand all called") ;
    let icon = button.querySelector('.open_close_icon');

    button.addEventListener('click', event => {
        // console.log('clicking on expand/collapse all')
        if (isOneSectionExpanded(sections)) {
            // console.log('one section is expanded');
            closeSections(false, sections);
            switchExpansionIcon(icon, false);
        }
        else {
            openSections(sections);
            switchExpansionIcon(icon, true);
        }
    })
}

let bindExpansionListeners = function(expandableGroups, expandAllButton = null) {
    // console.log("bind expansion listeners called");
    if (expandableGroups[0] != undefined) {
        expandableGroups.forEach(element => {
            // console.log(element);
            element.firstElementChild.addEventListener('click', (event) => {
                if (element.lastElementChild.classList.contains('hidden')) {
                    openExpansion(element);
                }
                else {
                    closeExpansion(element);
                }
                if (expandAllButton) {
                    updateExpandAllIcon(expandAllButton, expandableGroups)
                }
            });
        });
    }
    else {
        console.log("bindExpansion passed empty array");
    }
}

let isOneSectionExpanded = function(expandableGroups) {
    for (let expandable of expandableGroups) {
        if (expandable.lastElementChild.classList.contains('viewable')) {
            return true;
        }
    }

    return false;
}

let closeSections = function(shouldOpenFirst, sections) {
    if (shouldOpenFirst) {
        sections.forEach((element, index) => {
            if (index != 0) {
                closeExpansion(element);
            }
            else {
                openExpansion(element);
            }
        })
    }
    else {
        sections.forEach(element => {
            closeExpansion(element);
        })
    }
}

let openSections = function(sections) {
    sections.forEach(element => {
        openExpansion(element);
    });
}

let openExpansion = function(section) {
    showElement(section.lastElementChild);
    // console.log(section);
    // console.log('section.querySelector(.open_close_icon) returns' + section.querySelector('.open_close_icon'));
    switchExpansionIcon(section.querySelector('.open_close_icon'), true);
}

let closeExpansion = function(section) {
    hideElement(section.lastElementChild);
    switchExpansionIcon(section.querySelector('.open_close_icon'), false);
}

let showElement = function(element) {
    element.classList.add('viewable');
    element.classList.remove('hidden');
}

let hideElement = function(element) {
    element.classList.add('hidden');
    element.classList.remove('viewable');
}

let switchExpansionIcon = function(icon, isExpanding) {
    if (icon) {
        if (isExpanding) {
            icon.src = "https://s3.amazonaws.com/static.cosequin.com/ca/google_icons/google_font_close.svg";
        } else {
            icon.src = 'https://s3.amazonaws.com/static.cosequin.com/ca/google_icons/google_font_plus.svg';
        }
    }
    else {
        console.log('icon is undefined');
    }
    
}

// These are the actual calls for the script

let expandAllButton = document.querySelector('#expand_collapse_all');
let expandableSections = document.querySelectorAll('.expandable');

if (expandableSections.length != 0) {
    // console.log("there are expandable sections");
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





