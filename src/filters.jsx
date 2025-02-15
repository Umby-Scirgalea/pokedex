import classNames from "classnames";
import './filters.css'
import { useEffect, useState } from "react";

const Filters = ({theme, setSort, sortingMethod, onlyLegendarySet, onlyLegendary}) => {

    const [sortingMethodChanger,setSortingMethodChanger] = useState(sortingMethod);

    useEffect(()=>{
        setSort(sortingMethodChanger);
    },[sortingMethodChanger])

    const handleEvent = (e)=>{
        console.log(e.target.value)
        setSortingMethodChanger(e.target.value)
    }

    const themeClass = classNames({'darkT': theme, 'lightT': !theme})

    return (
        <div className={classNames("filters",themeClass)}>
            <button onClick={onlyLegendarySet} className={classNames("onlyLegendary",{'onlyLegendaryOn': onlyLegendary},themeClass)}>only legendary</button>
            <select value={sortingMethod} onChange={handleEvent} className={themeClass} name="sortingMethod" id="sortingMethod">
                <option className={themeClass} value="idUp">ID▲</option>
                <option className={themeClass} value="idDown">ID▼</option>
                <option className={themeClass} value="nameUp">NAME A-Z</option>
                <option className={themeClass} value="nameDown">NAME Z-A</option>
            </select>
        </div>
    )
}

export default Filters;