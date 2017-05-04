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

## Contributions

### Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-jquery-mlhmenu/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

### Code

1. Fork it ( https://github.com/[my-github-username]/iptools-jquery-mlhmenu/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### Tips

Following tasks are there to help with development:

- `grunt watch:bdd` listens to tests and source, reruns tests
- `grunt qa` run QA task that includes tests and JSHint
- `grunt build` minify source to dist/

## Licence
Copyright © 2015-2017 Interactive Pioneers GmbH. Licenced under [GPL-3](LICENSE).
