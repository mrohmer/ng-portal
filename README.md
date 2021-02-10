# @rohmer/ng-portal

Portals made easy :wink:

---

[![Powered by Rohmer](https://img.shields.io/badge/Powered%20by-Rohmer-B40A0A.svg)](https://m.rohmer.rocks)
[![NPM Downloads](https://img.shields.io/npm/dt/@rohmer/ng-portal)](https://npmjs.org/@rohmer/ng-portal)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@rohmer/ng-portal)](https://npmjs.org/@rohmer/ng-portal)
[![Open Issues](https://img.shields.io/github/issues/mrohmer/ng-portal)](https://github.com/mrohmer/ng-portal/issues)


## Installation

1.  Install package
    ```shell
    npm install @rohmer/ng-portal --save
    // OR
    yarn add @rohmer/ng-portal
    ```

2.  Import the `PortalModule` in your module.
    ```typescript
     import {PortalModule} from '@rohmer/ng-portal';
  
     @NgModule({
       // ...
       imports: [
         // ...
         PortalModule,
       ],
     })
    ```
3.  Define host elements to render content to.
    ```angular2html
    <rp-portal-host slot="any-slot-name"></rp-portal-host>
    <div rpPortalHost="another-slot-name"></div>
    ```

4.  Define content that should be rendered inside these hosts.
    ```angular2html
    <ng-template rpPortalSlot="any-slot-name">
        I'm rendered inside the slot called "any-slot-name".
    </ng-template>
    <ng-template rpPortalSlot="another-slot-name">
        I'm rendered inside the slot called "another-slot-name".    
    </ng-template>
    ```

