import { useAutocomplete } from '@mui/base/useAutocomplete';

import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import './search-form.css';


export default function SearchForm () : JSX.Element {

  const searchOptions = useAppSelector(getCameras);
  const navigate = useNavigate();

  const handleOptionClick = (id : number | undefined) => {
    if(id) {
      navigate(`${AppRoute.Root}${id?.toString()}`);
    }

  };

  const {getRootProps, groupedOptions , getOptionProps, getInputProps , getInputLabelProps, getListboxProps, popupOpen , getClearProps, inputValue} = useAutocomplete({
    id: 'header-search-bar',
    options: searchOptions,
    getOptionLabel: (option) => option.name,
    handleHomeEndKeys: true,
    clearOnEscape: true,
    onChange(evt, value) {
      evt.preventDefault();
      handleOptionClick(value?.id);
    },
    filterOptions(options, state) {
      if (state.inputValue.length > 2) {
        return options.filter((item) =>
          String(item.name).toLowerCase().includes(state.inputValue.toLowerCase())
        );
      }
      return options;
    },
  });

  return (
    <div {...getRootProps()} className={`form-search ${popupOpen && inputValue.length > 2 ? 'list-opened' : ''}`} >
      <form >
        <label {...getInputLabelProps()}>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            {...getInputProps()}
          />
        </label>
        <ul {...getListboxProps()} className="form-search__select-list">
          {groupedOptions.length > 0 ? (groupedOptions as typeof searchOptions).map((option, index) => (
            <li
              {...getOptionProps({option, index})}
              key={option.name}
              className="form-search__select-item"
              tabIndex={0}
            >
              {option.name}
            </li>
          ))
            :
            <li
              className="form-search__select-item"
              tabIndex={0}
            >
              По запросу ничего не найдено...
            </li>}
        </ul>
      </form>
      {inputValue !== '' &&
      <button {...getClearProps()} className="form-search__reset" type="reset">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>}
    </div>
  );
}
