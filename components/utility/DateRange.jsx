

const DateRange = ({ startYear, endYear, id }) => {
    const start = new Date(startYear);
    const end = new Date(endYear);
    return (
        <p id={id} className="sub-content">
            {start.toLocaleString('fr', { month: 'short' })} {start.getFullYear()} - {end != "Invalid Date" ? end.toLocaleString('fr', { month: 'short' }) + ' ' + end.getFullYear() : 'Présent'}
        </p>
    );
};

export default DateRange;