# jquery-mlhmenu
Multi-level horisontal jQuery menu.

## Features
Convert nested list to a functional horisontal menu of multiple levels.

## Requirements

- jQuery (version TBD)

## Example

```html
<nav id="my-menu">
   <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about/">About us</a>
         <ul>
            <li><a href="/about/history/">History</a></li>
            <li><a href="/about/team/">The team</a></li>
            <li><a href="/about/address/">Our address</a></li>
         </ul>
      </li>
      <li><a href="/contact/">Contact</a></li>
   </ul>
</nav>

<script src="scripts/jquery-mlhmenu.js"></script>
<script type="text/javascript">
   $(document).ready(function() {
      $("#my-menu").mlhmenu({
         // options
      });
   });
</script>

```

## Licence
Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).
