import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'
import axios from "axios"

type DayRecordType = {
  date: string;
  dailyCases: number;
  dailyDeaths: number;
}
type MonthRecordType = {
  cases: number;
  deaths: number;
}
type DataType = { [key: number]: MonthRecordType};

type DataContextProps = {
  data: DataType;
  loading: boolean;
};

const fetchData = async () => {
  const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data';
  const
    AreaType = "nation",
    AreaName = "england";

  const
    filters = [
      `areaType=${ AreaType }`,
      `areaName=${ AreaName }`
    ],
    structure = {
      date: "date",
      // name: "areaName",
      // code: "areaCode",
      dailyCases: "newCasesByPublishDate",
      // cumulativeCases: "cumCasesByPublishDate",
      dailyDeaths: "newDeaths28DaysByPublishDate",
      // cumulativeDeaths: "cumDeaths28DaysByPublishDate"
    };

  const
    apiParams = {
      filters: filters.join(";"),
      structure: JSON.stringify(structure),
    };
  const { data, status, statusText } = await axios.get(endpoint, {
    params: apiParams,
    timeout: 10000
  });

  if ( status >= 400 ) {
    throw new Error(statusText);
  }

  return data
};

const sanitizeData = (data: DayRecordType[]): DataType => {
  const result = {} as DataType;
  for (const item of data) {
    const itemYear = new Date(item.date).getFullYear();
    if (!result[itemYear]) {
      result[itemYear] = {
        cases: item.dailyCases,
        deaths: item.dailyDeaths
      }
    } else {
      result[itemYear].cases += item.dailyCases;
      result[itemYear].deaths += item.dailyDeaths;
    }
  }

  return result;
}

export const DataContext = React.createContext({} as DataContextProps);

const DataContextProvider: React.FC = (props) => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    const result = await fetchData()
    setData(sanitizeData(result.data))
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
  }, [data])

  return (
    <DataContext.Provider
      value={{
        data,
        loading
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
