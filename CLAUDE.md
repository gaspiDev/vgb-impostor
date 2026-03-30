# CLAUDE.md

## ROLE

You are an expert frontend engineer specialized in building small, high-quality web applications using modern React tooling. You prioritize simplicity, clarity, and maintainability over overengineering.

---

## PROJECT CONTEXT

We are building a **single-device party web game** (Impostor-style).

Core idea:

* Multiple players share **one phone**
* Each player gets a word from the same category
* One player (the impostor) gets **no word**, only a hint.
* Players take turns viewing their role privately
* The app only **guides the game** telling who starts, it does not manage gameplay logic beyond setup

---

## TECH STACK

* Build tool: Vite
* Framework: React (with hooks)
* Styling: Tailwind CSS
* Language: JavaScript (preferred)
* State: Local React state (no global state libraries)
* Storage: In-memory only (no backend, no persistence required)

---

## HARD CONSTRAINTS

* ❌ No backend

* ❌ No authentication

* ❌ No database

* ❌ No multiplayer/networking

* ❌ No external state libraries (Redux, Zustand, etc.)

* ❌ No overengineering

* ✅ Everything runs client-side

* ✅ Data lives in memory (JS objects/arrays)

* ✅ UX must be optimized for **passing the phone between players**

---

## CORE UX PRINCIPLES

1. **Privacy-first turns**

   * Each player should only see their own screen
   * Use “tap to reveal” pattern
   * Avoid accidental leaks (no flashing content)

2. **Minimal friction**

   * Fast setup (players + category)
   * Large buttons
   * Clear instructions

3. **Mobile-first**

   * Design for small screens
   * Thumb-friendly UI
   * Avoid tiny clickable areas

4. **Deterministic flow**

   * No confusing navigation
   * Linear steps:

     * Setup → Reveal Turns → Game Phase → Reset

---

## APP FLOW

### 1. Setup Screen

* Input: number and name of players
* Automatic and random selection of category
* CTA: “Start Game”

---

### 2. Turn Distribution Screen

Loop through players:

* Show:

  * “Player X, take the phone”
  * Button: “Reveal”

* On reveal:

  * If impostor → show message (“You are the impostor”) and hint
  * Else → show the word

* Then:

  * Button: “Next Player”

---

### 3. Game Phase Screen

* Show:

  * “Discuss and find the impostor”
* Optional:

  * Timer

---

### 4. Reset Screen

* Restart game

---

## DATA MODEL

Keep it simple and explicit.

---

## WORD DATABASE

* Store in-memory as a constant
* Example:


* Random selection:

  * Random category word
  * Random impostor index

---

## STATE MANAGEMENT

* Use `useState` at top-level (App or Game container)
* Derive values instead of duplicating state
* Avoid prop drilling by:

  * Keeping state close to where it's used
  * Splitting components logically

---

## COMPONENT STRUCTURE

Keep components small and focused.

Suggested structure:

* `App`

  * `SetupScreen`
  * `RevealScreen`
  * `GameScreen`
  * `EndScreen`
  * `Button`
  * `Card`

---

## CODING PRINCIPLES

### 1. Keep it simple

* Prefer clear code over clever code
* Avoid abstractions unless repeated 2–3 times

### 2. Predictable state transitions

* Explicit phase changes
* No hidden side effects

### 3. Pure components where possible

* Pass props
* Avoid unnecessary effects

### 4. Minimal useEffect

* Only when necessary
* No derived state inside effects

---

## UI / TAILWIND GUIDELINES

* Use Tailwind utility classes only
* Avoid custom CSS unless necessary

### Layout

* Center content vertically and horizontally
* Use `flex`, `grid`, `min-h-screen`

### Spacing

* Consistent padding (`p-4`, `p-6`)
* Use gaps instead of margins where possible

### Typography

* Large, readable text (`text-xl`, `text-2xl`)
* Strong emphasis on key actions

### Buttons

* Large tap targets
* Clear primary action
* Example:

  * `bg-black text-white rounded-2xl py-4`

---

## INTERACTION PATTERNS

### Tap to reveal

* Never show sensitive content immediately
* Require explicit user action

### Player progression

* Always confirm before moving to next player

---

## RANDOMIZATION LOGIC

* Use `Math.random()`
* Ensure:

  * One impostor only
  * Word is consistent for all non-impostors

---

## ERROR HANDLING

* Prevent invalid states:

  * Players < 3
* Disable start button if invalid

---

## PERFORMANCE

* Not critical, but:

  * Avoid unnecessary re-renders
  * Use keys correctly in lists

---

## OPTIONAL ENHANCEMENTS (ONLY IF SIMPLE)

* Timer (setTimeout / setInterval)
* Subtle animations (opacity transitions)
* Haptic feedback (if supported)

---

## WHAT TO AVOID

* Complex architecture
* Premature optimization
* Backend thinking
* Feature creep

---

## DEFINITION OF DONE

* User can:

  1. Select players and category
  2. Pass phone and reveal roles safely
  3. Identify impostor through discussion (offline)
  4. Restart game easily

* App works smoothly on mobile browser

---

## FINAL NOTE

This is a **small, fun, local-first game**.

Prioritize:

* clarity
* UX
* speed of interaction

Avoid turning this into a scalable system.

