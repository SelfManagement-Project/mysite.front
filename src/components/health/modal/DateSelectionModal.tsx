import React from 'react';

interface DateSelectionModalProps {
    // isOpen: boolean;
    onClose: () => void;
    // onSelectDate: (date: Date) => void;
}

const DateSelectionModal = ({ onClose }: DateSelectionModalProps) => {
    // if (!isOpen) return null;

    // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedDate = new Date(event.target.value);
    //     onSelectDate(selectedDate);
    // };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Select a Date</h2>
                {/* <input type="date" onChange={handleDateChange} /> */}
            </div>
        </div>
    );
};

export default DateSelectionModal;