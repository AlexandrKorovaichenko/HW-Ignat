import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: Array<string>
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, 
        name,
        options, 
        value,
        onChange, 
        onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        console.log(e.currentTarget.value);
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)

    }


    const mappedOptions: Array<JSX.Element> = options ? options.map((o, i) => ( // map options with key
        
        <label key={name + '-' + i}>
            
            <input
                checked = {value === o}
                type = { 'radio' }
                name = { name }
                value = { o }
                onChange = { onChangeCallback }
                {...restProps}
            />
            
            {o}

        </label>

    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
