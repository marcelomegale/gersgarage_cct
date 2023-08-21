import React, {useState, useEffect} from 'react';
import {Field, ErrorMessage} from 'formik';
import axios from 'axios';

const FormikComboBox = ({name, type, filtered, filter, placeholder='Select an option', showFormGroup=true, ...props}) => {
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    try {
      if(filtered && !filter) return;

      let url;
      url = filtered ? `/domain/filtered/${type}/${filter}` : `/domain/combo/${type}`;
      const response = await axios.get(url);
      const data = response.data.data || [];
      setOptions(data);
    } catch (error) {
      console.error(`Error fetching data (FormikCombo, ${type}):`, error);
    }
  }

  useEffect(() => {
    if(!options.length) fetchData();
  }, [name]);

  useEffect(() => {
    if(filtered) setOptions([]);
    if(!options.length) fetchData();
  }, [filter]);

  return (
    <div className={showFormGroup ? 'form-group' : ''}>
      {props.label && <label htmlFor={name}>{props.label}</label>}
      <Field as='select' name={name} className='form-control' {...props} disabled={(filtered && (!filter || !options.length) ) }>
        <option value='' label={placeholder} />
        {options.map(option => (
          <option key={option.id} value={option.id} label={option.name}/>
        ))}
      </Field>
      <ErrorMessage name={name} component='div' className='invalid-feedback'/>
    </div>
  );
};

export default FormikComboBox;
