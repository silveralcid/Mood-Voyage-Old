import React, { useState } from "react";

interface NeedsData {
    SustenanceRating: number;
    RestRating: number;
    ShelterRating: number;
    AcceptanceRating: number;
    IntimacyRating: number;
    LoveRating: number;
    CompetenceRating: number;
    GrowthRating: number;
    RespectRating: number;
}

interface NeedsFormProps {
    onSubmit: (data: NeedsData) => void;
}

const NeedsForm: React.FC<NeedsFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<NeedsData>({
        SustenanceRating: 0,
        RestRating: 0,
        ShelterRating: 0,
        AcceptanceRating: 0,
        IntimacyRating: 0,
        LoveRating: 0,
        CompetenceRating: 0,
        GrowthRating: 0,
        RespectRating: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: parseInt(value, 10)}));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            SustenanceRating: 0,
            RestRating: 0,
            ShelterRating: 0,
            AcceptanceRating: 0,
            IntimacyRating: 0,
            LoveRating: 0,
            CompetenceRating: 0,
            GrowthRating: 0,
            RespectRating: 0
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
                        value={formData[key as keyof NeedsData]}
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

export default NeedsForm;