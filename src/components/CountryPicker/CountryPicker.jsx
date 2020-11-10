import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());

        }

        fetchAPI();
    }, [setFetchedCountries]);

    const useStyles = makeStyles({
        select: {
          color: 'grey',
          variant:'h2',
        },
        icon: {
            color: 'grey',
        }
      });
    const classes = useStyles();

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect classes={{
        select: classes.select, // class name, e.g. `classes-nesting-root-x`
        icon: classes.icon,
      }} defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
       
                <option value="">Worldwide</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;