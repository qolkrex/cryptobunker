import { useEffect, useState } from "react";

export const useDeadline = () => {
    const [deadline, setDeadline] = useState(0);

    // get deadline every 20 minutes
    useEffect(() => {
        setDeadline(Math.floor(Date.now() / 1000) + 1320);
        const interval = setInterval(() => {
            setDeadline(Math.floor(Date.now() / 1000) + 1320);
        }, 1000 * 60 * 20);
        console.log("deadline", deadline);
        return () => clearInterval(interval);
    }, []);

    return {
        deadline,
    };
};
