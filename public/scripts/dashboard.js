let expandableItems = document.getElementsByClassName(`expandable`)



for (let i = 0; i < expandableItems.length; ++i) {
    let bttn = expandableItems[i]
    bttn.addEventListener(`click`, function() {
        let associatedList = this.nextElementSibling
        if (associatedList && associatedList.tagName == `UL`) {
            associatedList.toggleAttribute(`hidden`)
            associatedList.scrollIntoView({ behavior: "smooth", block: "nearest" });
            if (i + 1 == expandableItems.length)
                associatedList.scrollIntoView({ behavior: "smooth" });
        }
    })
}