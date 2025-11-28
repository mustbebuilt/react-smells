# Two React Projects to illustrate **code smells**

## Summary of Code Smells Present

### Inconsistent Naming Convention

Mix of camelCase, PascalCase and snake_case.

### Inline Styles Everywhere

```jsx
<div style={{ display: "flex", gap: "20px" }}>
```

Clutters markup and mixes concerns.

### No Reusable Components

Everything is hard-coded in one file rather than split into components such as:

* `FilmDetails`
* `FilmsPage`

Makes code harder to maintain/extend.

### No Separation of Concerns

Data fetching, data transformation, rendering and interactions are all tangled.

### God Component (Too Much Responsibility)**

React Smells has one `App.jsx` that handles:

* fetching all films
* fetching single film
* rendering layout
* updating the document title

Violates SRP (Single Responsibility Principle).

### Deadcode

The `deleteFilm()` method never called.

### Hard-Coded API URL

```js
const BASE = "https://www.mustbebuilt.co.uk/SHU/films-api/api.php";
```

Should be in a service or environment config.

### Mixed State Types (selectedFilm = ID OR object)**

```js
setSelectedFilm(f.filmID);  // number
setSelectedFilm(film);      // object
```

Causes branching logic, fragile UI behaviour, and bugs.


### Duplicate Fetch Logic

Fetching list and fetching details both inline:

```js
fetch(BASE)
fetch(`${BASE}?filmID=${selectedFilm}`)
```

No abstraction, repeated code.

### Side Effects Inside useEffect (DOM Manipulation)

```js
document.title = film.filmTitle;
```

React should control the document title through a dedicated hook or component.

### Missing Error Handling

Every fetch assumes success:

```js
fetch(...).then(r => r.json())
```

UI will silently break on network or API failure.

---

### Inline Anonymous Functions Doing Too Much

```js
onClick={(ev) => {
  ev.preventDefault();
  setSelectedFilm(f.filmID);
}}
```

Hard to test, hard to read.

###  Render Function Doing Logic Work

```js
if (!selectedFilm) return ...
if (filmLoading) return ...
```

UI and business logic mixed together.

### **9. Imperative Manual State Updates After Delete**

```js
const newFilms = films.filter(...)
setFilms(newFilms);
setSelectedFilm(null);
```

No centralised data handling.

### **10. useEffect Dependencies Wrong / Over-triggered**

The `selectedFilm` effect fires on every change and mixes:

* type checking
* loading state
* fetching logic
* title updates

Too many concerns in one effect.
