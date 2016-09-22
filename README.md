# Luvago React Forms

This package provides containers to work with forms, inputs, and custom input-components.

```jsx
<Form formName="test-form">
  <Field formName="test-form" fieldName="user" defaultValue={this.data.user || {firstName: 'John'}}>
    <input type="text" name="firstName" />

    <FieldError />
  </Field>
  <Field formName="test-form" fieldName="dob" defaultValue={this.data.dob}>
    <InputComponent />
  </Field>
</Form>
```

## Form Attributes
* `formName` - used as the key in the state to save the current form

## Field Attributes
* `formName` - used as the key in the state to save the current form
* `fieldName` - used as the key in form.fields to save the current field

## Field Children Attributes
* `onChange` - must be called in custom components with `this.props.onChange(event, data)`
  * if `data` is undefined, the Field component will try to use `event.target.value` (so this works with almost every native input out of the box)
* `processFunc` - gets called with the same signature as onChange, but the returned value will be used to store the data
  * example: `<input type="text" name="firstName" processFunc={(event, value) => value.toUpperCase()} />`
  * also works with promises, and will change the value in the state once the promise resolves
* `validators` - array of validators from `FormValidators` which will be applied to the field onChange or onBlur depending on the input type


## License

MIT
