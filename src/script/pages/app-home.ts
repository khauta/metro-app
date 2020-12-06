import { LitElement, css, html, customElement, internalProperty } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import { getNearbyStops } from '../services/metro';

@customElement('app-home')
export class AppHome extends LitElement {

  @internalProperty() gotLocation: boolean = false;
  @internalProperty() location: string | null = null;

  static get styles() {
    return css`
      #welcomeBar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
      }

      #welcomeBar fast-card {
        margin-bottom: 12px;
      }

      #welcomeCard, #infoCard {
        padding: 18px;
        padding-top: 0px;
      }

      pwa-install {
        position: absolute;
        bottom: 16px;
        right: 16px;
      }

      button {
        cursor: pointer;
      }

      @media(min-width: 1200px) {
        #welcomeCard, #infoCard {
          width: 40%;
        }
      }

      @media(screen-spanning: single-fold-vertical) {
        #welcomeBar {
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }

        #welcomeCard {
          margin-right: 64px;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // this method is a lifecycle even in lit-element
    // for more info check out the lit-element docs https://lit-element.polymer-project.org/guide/lifecycle
    console.log('This is your home page');
  }

  async setLocation() {
    navigator.geolocation.getCurrentPosition(async (pos: Position) => {
      console.log(pos);

      this.gotLocation = true;
      this.location = `${pos.coords.latitude},${pos.coords.longitude}`;
      console.log(this.location);

      await this.getNearby();

    })
  }

  async getNearby() {
    if (this.location) {
      const stops = await getNearbyStops(this.location);
      console.log(stops);
    }
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      })
    }
  }

  render() {
    return html`
      <div>
      
        ${!this.gotLocation ? html`<div id="welcomeBar">
          <h2>Allow location access to find your local transit options</h2>
          <fast-button @click="${() => this.setLocation()}">Get My Location</fast-button>
        </div>` : null}
      
        <pwa-install>Install PWA Starter</pwa-install>
      </div>
    `;
  }
}