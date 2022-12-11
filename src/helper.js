const indexCounter = () => {
    let currIndex = 0;
    function incrementIndex() {
        currIndex = currIndex + 1;
    }
    return {currIndex, incrementIndex};
}

export default indexCounter;