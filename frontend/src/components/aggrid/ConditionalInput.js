import React, {
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
  } from 'react';

  


export const ConditionalInputEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState(parseFloat(props.value[0]));

    const refInput = useRef(null);

    useEffect(() => {
      // focus on the input
      refInput.current.focus();
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue: () => {
            // this simple editor doubles any value entered into the input
            console.debug('getValue', value);
            return [parseFloat(value), props.value[1]];
          }
          // this simple editor doubles any value entered into the input
         
        }


   
    });

    return (
      <input
        type="number"
        ref={refInput}
        value={value}
        className="ag-input-field-input ag-text-field-input"
        onChange={(event) => setValue(event.target.value)}
        style={{ width: '100%' }}
        disabled={props.value[1]}
      />
    );
  })


export const ConditionalInputRenderer = (props) => {
    const cellValue = props.value;

    return (
        <span>
           <span>{cellValue[0]}</span>
        </span>
    );
}