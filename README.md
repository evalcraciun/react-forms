# Luvago React Forms

This Package provides Containers to work with forms.

```jsx
<Form formName="test-form">
  <Field fieldName="user">
    <!-- fieldName references a field within "user", to structure complex datatypes -->
    <input type="text" fieldName="firstName" />

    <!-- used to display errors -->
    <FieldError />
  </Field>
</Form>
```

## License

MIT
