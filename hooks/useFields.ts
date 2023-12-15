import {useState} from "react";

interface FieldValues {
    [key: string]: string | number | boolean | null;
}

export default function useFields(values: FieldValues = {}) {
    const [fields, setFields] = useState(values)

    function handleFields(input: {name: string, value: string | number | boolean}) {
        setFields(fields => ({
            ...fields,
            [input.name]: input.value,
        }))
    }

    function updateFields(updatedValues: FieldValues) {
        setFields((prevFields) => ({
            ...prevFields,
            ...updatedValues,
        }));
    }

    return {fields, handleFields, updateFields, setFields}
}
