# SauceDemo Test Cases: Critical Workflows

- **Application under test:** https://www.saucedemo.com
- **Source:** Derived from the manual run documented in [saucedemo-critical-workflows.md](saucedemo-critical-workflows.md) (2026-10-30)
- **Status key:** ✅ Executed manually and passed · ⬜ Proposed, not yet executed

## Test Data

| Item | Value |
|---|---|
| Standard user | `standard_user` |
| Locked-out user | `locked_out_user` |
| Password (all users) | `secret_sauce` |
| Checkout info | First name `Test`, Last name `User`, Zip `75500` |
| Tax rate | 8% of item total, rounded to 2 decimals |

Product prices: Sauce Labs Onesie $7.99, Bike Light $9.99, Bolt T-Shirt $15.99, Test.allTheThings() T-Shirt (Red) $15.99, Backpack $29.99, Fleece Jacket $49.99.

**Global precondition:** Browser is open with a clean session (no cookies or storage) unless a case says otherwise.

---

## 1. Authentication

### TC-AUTH-01 · Login with empty credentials shows error ✅
**Priority:** High
**Preconditions:** User is on the login page `/`.
**Steps:**
1. Leave the Username and Password fields empty.
2. Click the **Login** button.

**Expected results:**
- An error alert appears with the text "Epic sadface: Username is required".
- The alert has a **Dismiss error** button.
- The user stays on the login page `/`.

### TC-AUTH-02 · Login with a locked-out user is rejected ✅
**Priority:** High
**Steps:**
1. On the login page, enter `locked_out_user` in Username.
2. Enter `secret_sauce` in Password.
3. Click **Login**.

**Expected results:**
- Error alert reads "Epic sadface: Sorry, this user has been locked out."
- The user stays on `/` and is not taken to the inventory.
- The entered values remain in the fields.

### TC-AUTH-03 · Login with valid standard user succeeds ✅
**Priority:** Critical
**Steps:**
1. On the login page, enter `standard_user` in Username.
2. Enter `secret_sauce` in Password.
3. Click **Login**.

**Expected results:**
- URL changes to `/inventory.html`.
- Page header shows "Swag Labs" and the "Products" title.
- Six products are listed, each with image, name, description, price and an **Add to cart** button.
- The cart badge shows no items (accessible name "Cart, empty").

### TC-AUTH-04 · Missing password shows error ⬜
**Priority:** High
**Steps:**
1. Enter `standard_user` in Username, leave Password empty.
2. Click **Login**.

**Expected results:** Error alert "Epic sadface: Password is required". User stays on `/`.

### TC-AUTH-05 · Wrong password shows error ⬜
**Priority:** High
**Steps:**
1. Enter `standard_user` in Username and `wrong_password` in Password.
2. Click **Login**.

**Expected results:** Error alert "Epic sadface: Username and password do not match any user in this service". User stays on `/`.

### TC-AUTH-06 · Logout returns user to the login page ✅
**Priority:** High
**Preconditions:** Logged in as `standard_user`.
**Steps:**
1. Click the **Open Menu** (hamburger) button.
2. Click the **Logout** link in the side menu.

**Expected results:** User lands on `/` and the login form is shown with empty fields.

### TC-AUTH-07 · Protected pages are not accessible when logged out ✅
**Priority:** High
**Preconditions:** User has just logged out (TC-AUTH-06).
**Steps:**
1. Navigate directly to `https://www.saucedemo.com/inventory.html`.

**Expected results:** User is redirected to the login page `/`; the product list is not displayed.

### TC-AUTH-08 · Dismiss error message ⬜
**Priority:** Low
**Steps:**
1. Trigger the "Username is required" error (TC-AUTH-01).
2. Click the **Dismiss error** button.

**Expected results:** The error alert disappears and the form remains usable.

---

## 2. Product Catalogue

### TC-INV-01 · Sort products by price, low to high ✅
**Priority:** High
**Preconditions:** Logged in as `standard_user`, on `/inventory.html`.
**Steps:**
1. Open the "Sort products" dropdown (default "Name (A to Z)").
2. Select **Price (low to high)**.

**Expected results:**
- The dropdown shows "Price (low to high)".
- Products appear in this order: Onesie $7.99, Bike Light $9.99, Bolt T-Shirt $15.99, Test.allTheThings() T-Shirt (Red) $15.99, Backpack $29.99, Fleece Jacket $49.99.

### TC-INV-02 · Sort products by price, high to low ⬜
**Priority:** Medium
**Steps:** Select **Price (high to low)** in the sort dropdown.
**Expected results:** Order is Fleece Jacket $49.99 down to Onesie $7.99.

### TC-INV-03 · Sort products by name, A to Z and Z to A ⬜
**Priority:** Medium
**Steps:**
1. Confirm default order is A to Z.
2. Select **Name (Z to A)**.

**Expected results:** Default list starts with Sauce Labs Backpack; Z to A starts with Test.allTheThings() T-Shirt (Red).

### TC-INV-04 · View product details ⬜
**Priority:** Medium
**Steps:** Click a product name or image on the inventory page.
**Expected results:** Product detail page opens with the matching name, description, price and an **Add to cart** button; a back control returns to the inventory.

---

## 3. Shopping Cart

### TC-CART-01 · Add items to the cart from the inventory ✅
**Priority:** Critical
**Preconditions:** Logged in as `standard_user`, empty cart, products sorted by price low to high.
**Steps:**
1. Click **Add to cart** on Sauce Labs Onesie.
2. Click **Add to cart** on Sauce Labs Bike Light.

**Expected results:**
- After each click that product's button changes from **Add to cart** to **Remove**.
- The cart badge shows 1, then 2 (accessible name "Cart, 2 items").

### TC-CART-02 · Cart page shows the selected items ✅
**Priority:** Critical
**Preconditions:** TC-CART-01 completed.
**Steps:** Click the cart icon in the header.

**Expected results:**
- URL is `/cart.html`, title "Your Cart".
- Two lines are listed: Onesie ($7.99, QTY 1) and Bike Light ($9.99, QTY 1), each with description and a **Remove** button.
- **Continue Shopping** and **Checkout** buttons are visible.

### TC-CART-03 · Remove an item from the cart ⬜
**Priority:** High
**Steps:** On the cart page click **Remove** next to Onesie.
**Expected results:** Onesie disappears from the list, cart badge shows 1, Bike Light remains.

### TC-CART-04 · Continue shopping returns to inventory ⬜
**Priority:** Medium
**Steps:** On the cart page click **Continue Shopping**.
**Expected results:** User returns to `/inventory.html`; items already added still show **Remove**.

### TC-CART-05 · Cart persists across navigation ⬜
**Priority:** Medium
**Steps:** Add an item, navigate to the cart, go back to inventory, then reopen the cart.
**Expected results:** The same items remain in the cart.

---

## 4. Checkout

### TC-CHK-01 · Checkout information form requires First Name ✅
**Priority:** High
**Preconditions:** Cart contains Onesie and Bike Light; user is on `/cart.html`.
**Steps:**
1. Click **Checkout**.
2. On "Checkout: Your Information" (`/checkout-step-one.html`), leave all fields empty.
3. Click **Continue**.

**Expected results:**
- Error alert "Error: First Name is required" appears with a **Dismiss error** button.
- User stays on `/checkout-step-one.html`.

### TC-CHK-02 · Checkout form requires Last Name ⬜
**Priority:** Medium
**Steps:** Fill First Name only, click **Continue**.
**Expected results:** Error "Error: Last Name is required".

### TC-CHK-03 · Checkout form requires Postal Code ⬜
**Priority:** Medium
**Steps:** Fill First and Last Name only, click **Continue**.
**Expected results:** Error "Error: Postal Code is required".

### TC-CHK-04 · Checkout overview shows correct items and totals ✅
**Priority:** Critical
**Preconditions:** On `/checkout-step-one.html` with Onesie and Bike Light in the cart.
**Steps:**
1. Enter First Name `Test`, Last Name `User`, Zip/Postal Code `75500`.
2. Click **Continue**.

**Expected results:**
- URL is `/checkout-step-two.html`, title "Checkout: Overview".
- Both items are listed with QTY 1 and correct prices.
- Payment information is "SauceCard #31337"; shipping is "Free Pony Express Delivery!".
- Item total is $17.98, Tax is $1.44, Total is $19.42.
- **Cancel** and **Finish** buttons are visible.

### TC-CHK-05 · Complete the order ✅
**Priority:** Critical
**Preconditions:** TC-CHK-04 completed.
**Steps:** Click **Finish**.

**Expected results:**
- URL is `/checkout-complete.html`, title "Checkout: Complete!".
- Heading "Thank you for your order!" and the dispatch message are shown with the Pony Express image.
- The cart badge is empty.
- **Back Home** and **Generate PDF order** buttons are visible.

### TC-CHK-06 · Cancel from checkout overview ⬜
**Priority:** Medium
**Steps:** On the overview page click **Cancel**.
**Expected results:** User returns to `/inventory.html` and cart contents are unchanged.

### TC-CHK-07 · Back Home after order resets the shop ⬜
**Priority:** Medium
**Steps:** On the completion page click **Back Home**.
**Expected results:** Inventory page opens with an empty cart and all buttons showing **Add to cart**.

---

## 5. End-to-End Scenario

### TC-E2E-01 · Purchase two items as a standard user ✅
**Priority:** Critical
**Steps:**
1. Open `https://www.saucedemo.com`.
2. Log in as `standard_user` / `secret_sauce`.
3. Sort products by **Price (low to high)**.
4. Add Sauce Labs Onesie and Sauce Labs Bike Light to the cart.
5. Open the cart and verify both items.
6. Click **Checkout**, enter `Test` / `User` / `75500`, click **Continue**.
7. Verify item total $17.98, tax $1.44, total $19.42.
8. Click **Finish** and verify the confirmation message.
9. Open the menu and click **Logout**.
10. Navigate directly to `/inventory.html`.

**Expected results:** Every step succeeds as described in the individual cases above; at step 10 the user is redirected to the login page.

---

## 6. Non-Functional Checks

### TC-A11Y-01 · Errors and controls expose accessible roles and names ✅ (observed)
**Observations from the run:** Error messages use `role=alert`; forms are named "Login" and "Checkout information"; product images have alt text; the cart button name includes the item count; sort dropdown is named "Sort products".
**Follow-up (⬜):** Keyboard-only navigation of the full purchase flow, colour contrast, focus order and screen reader output are not yet verified.

### TC-NET-01 · No functional console errors ✅ (observed)
**Observations:** Console shows repeated `401` responses from `events.backtrace.io` (third-party telemetry with placeholder `UNIVERSE`/`TOKEN` values) and a Chrome hint about the missing `autocomplete="current-password"` attribute. Neither affects user workflows.
**Test plan note:** Filter these known entries out when asserting on console errors in automation.

---

## 7. Out of Scope for This Run (candidates for later)

| ID | Area | Idea |
|---|---|---|
| TC-USR-01 | Special users | `problem_user`: check broken images and sort / cart behaviour |
| TC-USR-02 | Special users | `performance_glitch_user`: verify login still succeeds and measure delay |
| TC-USR-03 | Special users | `error_user`: verify cart and checkout error behaviours |
| TC-USR-04 | Special users | `visual_user`: compare layout against `standard_user` |
| TC-RESP-01 | Responsive | Run the E2E flow at mobile viewport widths |
| TC-LINK-01 | Footer | Verify X, Facebook and LinkedIn footer links open the right destinations |

## Traceability

| Manual scenario (report) | Test cases |
|---|---|
| 1. Empty login | TC-AUTH-01 |
| 2. Locked-out user | TC-AUTH-02 |
| 3. Standard user login | TC-AUTH-03 |
| 4. Sort and add to cart | TC-INV-01, TC-CART-01 |
| 5. Cart review | TC-CART-02 |
| 6. Checkout validation | TC-CHK-01 |
| 7. Overview and totals | TC-CHK-04 |
| 8. Completion, logout, session protection | TC-CHK-05, TC-AUTH-06, TC-AUTH-07 |
