import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Tos = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate();

  const toNavigate = () => {
    navigate('/');
}
  return (
    <div>
<label>Generic Terms and Conditions template

Terms and Conditions ("Terms")

Last updated: (26/5/2300)

Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://www.mywebsite.com (change this) website and the My Mobile App (change this) mobile application (the "Service") operated by My Company (change this) ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.

By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.

Purchases

If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your …

The Purchases section is for businesses that sell online (physical or digital). For the full disclosure section, create your own Terms and Conditions.

Subscriptions

Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring ...

The Subscriptions section is for SaaS businesses. For the full disclosure section, create your own Terms and Conditions.

Content

Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the …

The Content section is for businesses that allow users to create, edit, share, make content on their websites or apps. For the full disclosure section, create your own Terms and Conditions.



Links To Other Web Sites

Our Service may contain links to third-party web sites or services that are not owned or controlled by My Company (change this).

My Company (change this) has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that My Company (change this) shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.

Changes

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 (change this) days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

Contact Us

If you have any questions about these Terms, please contact us.





















Create your own Terms and Conditions
For websites, apps and more. Download as HTML or Text. Unlock premium content.
Disclaimer: Legal information is not legal advice. Read the disclaimer.

</label>
    </div>
  )
}
export default Tos