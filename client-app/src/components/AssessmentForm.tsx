import React, { useState } from "react";

export interface AssessmentData {
    LivelihoodAvgRating: number;
    ConnectionAvgRating: number;
    EsteemAvgRating: number;
    AutonomyAvgRating: number;
    PurposeAvgRating: number;
    ActualizationAvgRating: number;

}

interface AssessmentFormProps {
    onSubmit: (data: AssessmentData) => void;
    onSubmitSuccess: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, onSubmitSuccess }) => {
    const [formData, setFormData] = useState<AssessmentData>({
        LivelihoodAvgRating: 0,
        ConnectionAvgRating: 0,
        EsteemAvgRating: 0,
        AutonomyAvgRating: 0,
        PurposeAvgRating: 0,
        ActualizationAvgRating: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: parseInt(value, 10)}));
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit(formData);
        onSubmitSuccess();
        setFormData({
            LivelihoodAvgRating: 0,
            ConnectionAvgRating: 0,
            EsteemAvgRating: 0,
            AutonomyAvgRating: 0,
            PurposeAvgRating: 0,
            ActualizationAvgRating: 0
        });
    }

    return (
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
            <div key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input
                type="number"
                id={key}
                name={key}
                value={formData[key as keyof AssessmentData]}
                onChange={handleChange}
                required
                min="0"
                max="100"
            />
            </div>
        ))}
        <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Submit
            </button>
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Undo
            </button>
        </div>
        </form>
    );
}

export default AssessmentForm;