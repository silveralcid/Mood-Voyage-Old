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
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit }) => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
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
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
        </form>
    );
}

export default AssessmentForm;