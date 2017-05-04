# iptools-jquery-mlhmenu [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-mlhmenu.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-mlhmenu) [![Bower version](https://badge.fury.io/bo/iptools-jquery-mlhmenu.svg)](http://badge.fury.io/bo/iptools-jquery-mlhmenu)

Multi-level horisontal jQuery menu.

## Features
Convert nested list to a functional horisontal menu of multiple levels.

## Requirements

- jQuery 1.11.3 or greater

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

<script src="scripts/iptools-jquery-mlhmenu.js"></script>
<script type="text/javascript">
   $(document).ready(function() {
      $("#my-menu").iptMlhMenu({
         // options
      });
   });
</script>

```

## Options

1. id - The identifier of the cloned copy of the menu
2. title - the title of the menu
3. subtitle - the subtitle of the menu
4. breakPalm - The pixel value at which the clone function triggers
5. menuExtensions - Array of menu extension names (strings)

## Licence
Copyright © 2015-2017 Interactive Pioneers GmbH. Licenced under [GPL-3](LICENSE).
