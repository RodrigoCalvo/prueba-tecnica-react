import { useMemo } from "react";
import { useController } from "../../controller/useController";
import "./list-navigation.css";

export const ListNavigation = () => {
  const { selectedPage, charactersList, setSelectedPage } = useController();

  const totalPages = useMemo(
    () => charactersList.pagination.totalPages,
    [charactersList]
  );

  const showPreviousButtonPage = useMemo(
    () => selectedPage > 0,
    [selectedPage]
  );
  const showPreviousEllipsis = useMemo(
    () => selectedPage > 1 && selectedPage < totalPages - 1,
    [selectedPage, totalPages]
  );
  const showTwoPreviousPage = useMemo(
    () => selectedPage >= totalPages - 1 && selectedPage > 1,
    [selectedPage, totalPages]
  );
  const showTwoNextPage = useMemo(
    () => selectedPage < 1 && selectedPage < totalPages - 2,
    [selectedPage, totalPages]
  );
  const showNextEllipsis = useMemo(
    () => selectedPage < totalPages - 2,
    [selectedPage, totalPages]
  );
  const showNextButtonPage = useMemo(
    () => selectedPage < totalPages - 1,
    [selectedPage, totalPages]
  );

  const handleClick = (event: any) => {
    const evTarget = event.target as HTMLElement;
    setSelectedPage(Number(evTarget.id));
  };

  const handleSelectChange = (event: any) => {
    const evTarget = event.target as any;
    setSelectedPage(Number(evTarget.value));
  };

  return (
    <nav className="list-navigation">
      <ul className="list-navigation__container">
        {showPreviousButtonPage && (
          <li className="list-navigation__item">
            <button onClick={handleClick} id={(selectedPage - 1).toString()}>
              « Anterior
            </button>
          </li>
        )}
        {showPreviousEllipsis && (
          <li className="list-navigation__item--no-click">...</li>
        )}
        {showTwoPreviousPage && (
          <li className="list-navigation__item">
            <button onClick={handleClick} id={(selectedPage - 2).toString()}>
              {selectedPage - 1}
            </button>
          </li>
        )}
        {showPreviousButtonPage && (
          <li className="list-navigation__item">
            <button onClick={handleClick} id={(selectedPage - 1).toString()}>
              {selectedPage}
            </button>
          </li>
        )}
        <li className="list-navigation__item--active">
          <button id={selectedPage.toString()}>{selectedPage + 1}</button>
        </li>
        {showNextButtonPage && (
          <li className="list-navigation__item">
            <button onClick={handleClick} id={(selectedPage + 1).toString()}>
              {selectedPage + 2}
            </button>
          </li>
        )}
        {showTwoNextPage && (
          <li className="list-navigation__item">
            <button onClick={handleClick} id={(selectedPage + 2).toString()}>
              {selectedPage + 3}
            </button>
          </li>
        )}
        {showNextEllipsis && (
          <li className="list-navigation__item--no-click">...</li>
        )}
        {showNextButtonPage && (
          <li className="list-navigation__item">
            <button onClick={handleClick} id={(selectedPage + 1).toString()}>
              Siguiente »
            </button>
          </li>
        )}
        <li className="list-navigation__page-select-container">
          <select
            className="list-navigation__page-select"
            onChange={handleSelectChange}
            value={selectedPage}
          >
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (index) => (
                <option key={index} value={(index - 1).toString()}>
                  Página {index}
                </option>
              )
            )}
          </select>
        </li>
      </ul>
    </nav>
  );
};
