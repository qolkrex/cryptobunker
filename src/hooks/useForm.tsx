import { useState, ChangeEvent, useCallback } from "react";

export const useForm = <T extends Object>(initialState: T) => {
    const [values, setValues] = useState(initialState);

    const handleFormChange = useCallback(
        ({ target }: any): void => {
            setValues({
                ...values,
                [target?.name]: target?.value,
            });
        },
        [values]
    );

    const reset = () => {
        setValues(initialState);
    };

    return {
        values,
        setValues,
        handleFormChange,
        reset,
    };
};
