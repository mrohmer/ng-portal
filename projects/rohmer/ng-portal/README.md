# @rohmer/ng-portal

[![Powered by Rohmer](https://img.shields.io/badge/Powered%20by-Rohmer-B40A0A.svg)](https://m.rohmer.rocks)

Portals made easy :wink:

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

