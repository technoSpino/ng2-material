import {
AsyncTestCompleter,
TestComponentBuilder,
beforeEach,
beforeEachProviders,
ddescribe,
describe,
el,
expect,
iit,
inject,
it,
xit,
} from 'angular2/testing_internal';
import {Component, View, ViewMetadata, provide} from 'angular2/core';
import {UrlResolver} from 'angular2/compiler';
import {MdSidenav} from '../../../ng2-material/components/sidenav/sidenav';
import {componentSanityCheck} from '../../util';

import {TestUrlResolver} from '../../test_url_resolver';
import {findChildByTag} from '../../util';
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {ComponentFixture} from "angular2/testing";
import {MATERIAL_PROVIDERS} from "../../../ng2-material/all";
import {Ink} from "../../../ng2-material/core/util/ink";

export function main() {
    let defaultTemplate = `
  <div layout="row">
    <md-sidenav md-component-id="left" class="md-sidenav-left">
      Left Nav!
    </md-sidenav>
    <md-content>
      Center Content
      <md-button ng-click="openLeftMenu()">
        Open Left Menu
      </md-button>
    </md-content>
    <md-sidenav md-component-id="right" md-is-locked-open="$mdMedia('min-width: 333px')" class="md-sidenav-right">
      <form>
        <md-input-container>
          <label for="testInput">Test input</label>
          <input id="testInput" type="text" ng-model="data" md-autofocus>
        </md-input-container>
      </form>
    </md-sidenav>
  </div>
  `;
    // componentSanityCheck('SideNav', 'md-sidenav', defaultTemplate);
  
    /** Test component that contains an MdButton. */
    @Component({ selector: 'test-app' })
    @View({
        directives: [MdSidenav],
        template: defaultTemplate
    })
    class TestComponent {
        clickCount: number = 0;
        isDisabled: boolean = false;

        increment() {
            this.clickCount++;
        }
    }

    describe('Side Navigation', () => {
        let builder: TestComponentBuilder;

        function setup(template: string = defaultTemplate): Promise<ComponentFixture> {
            return builder
                .overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then((fixture: ComponentFixture) => {
                    fixture.detectChanges();
                    return fixture;
                }).catch(console.error.bind(console));
        }

        beforeEachProviders(() => [
            MATERIAL_PROVIDERS,
            provide(UrlResolver, { useValue: new TestUrlResolver() }),
        ]);
        beforeEach(inject([TestComponentBuilder], (tcb) => {
            builder = tcb;
        }));

        describe('md-sidenav', () => {
            it('should not be open by default', inject([AsyncTestCompleter], (async) => {
                setup().then((fixture: ComponentFixture) => {
                    let testComponent = fixture.debugElement.componentInstance;
                    let mdSideNavDebugElement = findChildByTag(fixture.debugElement, 'md-sidenav');

                    expect(DOM.getAttribute(mdSideNavDebugElement.nativeElement, "class")).toContain("md-closed");
                    //   expect(testComponent.clickCount).toBe(1);

                    async.done();
                });
            }), 10000);

            it('should be open when toggled', inject([AsyncTestCompleter], (async) => {
                setup().then((fixture: ComponentFixture) => {
                    let testComponent = fixture.debugElement.componentInstance;
                    let mdSideNavDebugElement = findChildByTag(fixture.debugElement, 'md-sidenav');
                    let mdSideNav = <MdSidenav>mdSideNavDebugElement.componentInstance

                    mdSideNav.toggle();
                    expect(DOM.getAttribute(mdSideNavDebugElement.nativeElement, "class")).toContain("md-opened");
                    //   expect(testComponent.clickCount).toBe(1);

                    async.done();
                });
            }), 10000);
        });
    });

}
