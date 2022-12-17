import css from './Contacts.module.css';
import PropTypes from 'prop-types';
const Filter = ({ query, filterContact }) => {
  return (
    <label className={css.labelFilter}>
      Find contacts by name
      <input
        className={css.inputFilter}
        type="text"
        name="filter"
        value={query}
        onChange={filterContact}
      />
    </label>
  );
};
Filter.propTypes = {
  query: PropTypes.string,
  filterContact: PropTypes.func,
};
export default Filter;
