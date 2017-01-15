import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {render} from './Window';
import {productName, productUrl} from '../product/product';

export default class License extends React.Component {
    accept() {
        render(() => {
            localStorage.setItem('hippotomateLicenseAccepted', {accepted: true, atTime: new Date()});
        })
    }

    render() {
        return <div className="license" style={{padding: '0px', position: 'fixed', bottom: 0, left: 0, right: 0, top: 0}}>

            <div key="topbar" className="topbar">
                <div className="topbar-logo">
                    <img src="app/product/img/logo.png" />
                </div>
                <div className="topbar-title">
                    <h1>{productName}</h1>
                </div>
            </div>

            <div className="license-text" style={{margin: '100px 40px 40px 40px', position: 'fixed', bottom: '80px', top: 0, left: 0, right: 0, overflowY: 'scroll'}}>
                <ol>
                    <li>
                        <p><strong>Preamble:</strong> This Agreement, signed on Jan 10, 2017 (hereinafter: Effective Date) governs the
                            relationship between the user (you) (hereinafter: Licensee) and Mihai Valentin, a private
                            person (hereinafter: Licensor). This Agreement sets the
                            terms, rights, restrictions and obligations on using {productName} ({productUrl} (hereinafter: The Software) created and
                            owned by Licensor, as detailed herein</p>
                    </li>
                    <li>
                        <p><strong>License Grant:</strong> Licensor hereby grants Licensee a Personal, Non-assignable &amp;
                            non-transferable, Pepetual, Commercial, Royalty free, Without the rights to create derivative works,
                            Non-exclusive license, all with accordance with the terms set forth and other legal restrictions set forth
                            in 3rd party software used while running Software.</p>
                        <ol>
                            <li>
                                <p><strong>Limited:</strong> Licensee may use Software for the purpose of:</p>
                                <ol>
                                    <li>Running Software on Licensee’s Website[s] and Server[s];</li>
                                    <li>Allowing 3rd Parties to run Software on Licensee’s Website[s] and Server[s];</li>
                                    <li>Publishing Software’s output to Licensee and 3rd Parties;</li>
                                    <li>Distribute verbatim copies of Software’s output (including compiled binaries);</li>
                                    <li>Modify Software to suit Licensee’s needs and specifications.</li>
                                </ol>
                            </li>
                            <li>This license is granted perpetually, as long as you do not materially breach it.</li>
                            <li><b>Binary Restricted:</b> Licensee may sublicense Software as a part of a larger work containing more
                                than Software, distributed solely in Object or Binary form under a personal, non-sublicensable, limited
                                license. Such redistribution shall be limited to unlimited codebases.
                            </li>
                            <li>
                                <p><strong>Non Assignable &amp; Non-Transferable:</strong> Licensee may not assign or transfer his
                                    rights and duties under this license.</p>
                            </li>
                            <li>
                                <p><strong>Commercial, Royalty Free: </strong>Licensee may use Software for any purpose, including
                                    paid-services, without any royalties</p>
                            </li>
                        </ol>
                    </li>
                    <li><strong>Term &amp; Termination:</strong> The Term of this license shall be until terminated. Licensor may
                        terminate this Agreement, including Licensee’s license in the case where Licensee :
                        <ol>
                            <li>
                                <p>became insolvent or otherwise entered into any liquidation process; or</p>
                            </li>
                            <li>
                                <p>exported The Software to any jurisdiction where licensor may not enforce his rights under this
                                    agreements in; or</p>
                            </li>
                            <li>
                                <p>Licensee was in breach of any of this license's terms and conditions and such breach was not cured,
                                    immediately upon notification; or</p>
                            </li>
                            <li>
                                <p>Licensee in breach of any of the terms of clause 2 to this license; or</p>
                            </li>
                            <li>
                                <p>Licensee otherwise entered into any arrangement which caused Licensor to be unable to enforce his
                                    rights under this License.</p>
                            </li>
                        </ol>
                    </li>
                    <li><strong>Payment:</strong> In consideration of the License granted under clause 2, Licensee shall pay Licensor a
                        fee, via Credit-Card, PayPal or any other mean which Licensor may deem adequate. Failure to perform payment
                        shall construe as material breach of this Agreement.
                    </li>
                    <li>
                        <p><strong>Upgrades, Updates and Fixes:</strong> Licensor may provide Licensee, from time to time, with
                            Upgrades, Updates or Fixes, as detailed herein and according to his sole discretion. Licensee hereby
                            warrants to keep The Software up-to-date and install all relevant updates and fixes, and may, at his sole
                            discretion, purchase upgrades, according to the rates set by Licensor. Licensor shall provide any update or
                            Fix free of charge; however, nothing in this Agreement shall require Licensor to provide Updates or Fixes.
                        </p>
                        <ol>
                            <li>
                                <p><strong>Upgrades:</strong> for the purpose of this license, an Upgrade shall be a material amendment
                                    in The Software, which contains new features and or major performance improvements and shall be
                                    marked as a new version number. For example, should Licensee purchase The Software under version
                                    1.X.X, an upgrade shall commence under number 2.0.0.</p>
                            </li>
                            <li>
                                <p><strong>Updates: </strong> for the purpose of this license, an update shall be a minor amendment in
                                    The Software, which may contain new features or minor improvements and shall be marked as a new
                                    sub-version number. For example, should Licensee purchase The Software under version 1.1.X, an
                                    upgrade shall commence under number 1.2.0.</p>
                            </li>
                            <li>
                                <p><strong>Fix:</strong> for the purpose of this license, a fix shall be a minor amendment in The
                                    Software, intended to remove bugs or alter minor features which impair the The Software's
                                    functionality. A fix shall be marked as a new sub-sub-version number. For example, should Licensee
                                    purchase Software under version 1.1.1, an upgrade shall commence under number 1.1.2.</p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <p><strong>Support:</strong> Software is provided under an AS-IS basis and without any support, updates or
                            maintenance. Nothing in this Agreement shall require Licensor to provide Licensee with support or fixes to
                            any bug, failure, mis-performance or other defect in The Software.</p>
                        <ol>
                            <li>
                                <p><strong>Bug Notification: </strong> Licensee may provide Licensor of details regarding any bug,
                                    defect or failure in The Software promptly and with no delay from such event; Licensee shall comply
                                    with Licensor's request for information regarding bugs, defects or failures and furnish him with
                                    information, screenshots and try to reproduce such bugs, defects or failures.</p>
                            </li>
                            <li>
                                <p><strong>Feature Request: </strong> Licensee may request additional features in Software, provided,
                                    however, that (i) Licensee shall waive any claim or right in such feature should feature be
                                    developed by Licensor; (ii) Licensee shall be prohibited from developing the feature, or disclose
                                    such feature request, or feature, to any 3rd party directly competing with Licensor or any 3rd party
                                    which may be, following the development of such feature, in direct competition with Licensor; (iii)
                                    Licensee warrants that feature does not infringe any 3rd party patent, trademark, trade-secret or
                                    any other intellectual property right; and (iv) Licensee developed, envisioned or created the
                                    feature solely by himself.</p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <p><strong>Liability: </strong>&nbsp;To the extent permitted under Law, The Software is provided under an AS-IS
                            basis. Licensor shall never, and without any limit, be liable for any damage, cost, expense or any other
                            payment incurred by Licensee as a result of Software’s actions, failure, bugs and/or any other interaction
                            between The Software &nbsp;and Licensee’s end-equipment, computers, other software or any 3rd party,
                            end-equipment, computer or services. &nbsp;Moreover, Licensor shall never be liable for any defect in source
                            code written by Licensee when relying on The Software or using The Software’s source code.</p>
                    </li>
                    <li>
                        <p><strong>Warranty: &nbsp;</strong></p>
                        <ol>
                            <li>
                                <p><strong>Intellectual Property: </strong>Licensor hereby warrants that The Software does not violate
                                    or infringe any 3rd party claims in regards to intellectual property, patents and/or trademarks and
                                    that to the best of its knowledge no legal action has been taken against it for any infringement or
                                    violation of any 3rd party intellectual property rights.</p>
                            </li>
                            <li>
                                <p><strong>No-Warranty:</strong> The Software is provided without any warranty; Licensor hereby
                                    disclaims any warranty that The Software shall be error free, without defects or code which may
                                    cause damage to Licensee’s computers or to Licensee, and that Software shall be functional. Licensee
                                    shall be solely liable to any damage, defect or loss incurred as a result of operating software and
                                    undertake the risks contained in running The Software on License’s Server[s] and Website[s].</p>
                            </li>
                            <li>
                                <p><strong>Prior Inspection: </strong> Licensee hereby states that he inspected The Software thoroughly
                                    and found it satisfactory and adequate to his needs, that it does not interfere with his regular
                                    operation and that it does meet the standards and scope of his computer systems and architecture.
                                    Licensee found that The Software interacts with his development, website and server environment and
                                    that it does not infringe any of End User License Agreement of any software Licensee may use in
                                    performing his services. Licensee hereby waives any claims regarding The Software's incompatibility,
                                    performance, results and features, and warrants that he inspected the The Software.</p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <p><strong>No Refunds:</strong> Licensee warrants that he inspected The Software according to clause 7(c) and
                            that it is adequate to his needs. Accordingly, as The Software is intangible goods, Licensee shall not be,
                            ever, entitled to any refund, rebate, compensation or restitution for any reason whatsoever, even if The
                            Software contains material flaws.</p>
                    </li>
                    <li>
                        <p><strong>Indemnification:</strong> Licensee hereby warrants to hold Licensor harmless and indemnify Licensor
                            for any lawsuit brought against it in regards to Licensee’s use of The Software in means that violate,
                            breach or otherwise circumvent this license, Licensor's intellectual property rights or Licensor's title in
                            The Software. Licensor shall promptly notify Licensee in case of such legal action and request Licensee’s
                            consent prior to any settlement in relation to such lawsuit or claim.</p>
                    </li>
                    <li>
                        <p><strong>Governing Law, Jurisdiction: </strong>Licensee hereby agrees not to initiate class-action lawsuits
                            against Licensor in relation to this license and to compensate Licensor for any legal fees, cost or attorney
                            fees should any claim brought by Licensee against Licensor be denied, in part or in full.</p>
                    </li>
                    <li>
                        <p><strong>Endorsement:</strong>All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</p>
                    </li>
                </ol>
            </div>

            <div data-test-id="accept-license-button" style={{padding: '40px', position: 'fixed', bottom: 0, left: 0, right: 0, float: 'right'}}>
                <RaisedButton
                    primary={true}
                    label="I accept"
                    onClick={() => this.accept()}
                    style={{height: '44px', padding: 0}}
                    labelStyle={{lineHeight: '44px'}}
                />
            </div>

        </div>;
    }
}
