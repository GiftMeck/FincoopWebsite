export const scrollDown = (setScrollWindowHeight) => {
        window.scrollBy({
            top: window.innerHeight - 50,
            behavior: "smooth",
        });
        setScrollWindowHeight(true);
    }; 