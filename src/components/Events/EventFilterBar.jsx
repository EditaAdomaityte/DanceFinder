export const EventFilterBar = ({
  setSearchTerm,
  allDanceTypes,
  allAges,
  allStates,
  selectedAge,
  selectedDanceType,
  selectedState,
  setSelectedAge,
  setSelectedState,
  setSelectedDanceType,
}) => {
  return (
    <div className="filter-bar">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search events"
        className="event-search"
      />
      <select
        value={selectedAge}
        onChange={(event) => {
          setSelectedAge(event.target.value);
        }}
      >
        <option value="Select Age Group">Select Age Group</option>
        {allAges.map((age) => (
          <option key={age.id} value={age.name}>
            {age.name}
          </option>
        ))}
      </select>
      <select
        value={selectedDanceType}
        onChange={(event) => {
          setSelectedDanceType(event.target.value);
        }}
      >
        <option value="Select Dance">Select Dance</option>
        {allDanceTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.type}
          </option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={(event) => {
          setSelectedState(event.target.value);
        }}
      >
        <option value="Select State">Select State</option>
        {allStates.map((state) => (
          <option key={state.id} value={state.state_name}>
            {state.state_name}
          </option>
        ))}
      </select>
    </div>
  );
};
