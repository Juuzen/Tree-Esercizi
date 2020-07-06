import React from 'react'

export default function AccordionContent(props) {
  return (
    <ul className={`card-content ${props.collapsed ? "content-hidden" : ""}`}>
      <li>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elit nunc, fringilla id leo ac, porta pulvinar dui. Sed tincidunt auctor tincidunt. Vestibulum tempus neque massa, sed suscipit odio convallis vehicula. Sed sit amet pharetra metus, ut convallis lacus. Nullam at dolor egestas, porttitor libero at, fermentum massa. Fusce bibendum ante quis lectus fermentum blandit. Phasellus a nisi sed tortor pulvinar gravida. Nullam euismod eget orci ac pulvinar. Nullam fringilla viverra metus, id mollis quam molestie vitae.
      </li>
      <li>
        Quisque sit amet pharetra erat. Cras nisi sapien, vulputate sed tempus id, placerat in nibh. Phasellus feugiat nibh a odio rhoncus tincidunt. Etiam mauris eros, varius vitae quam accumsan, consequat malesuada dui. Cras posuere, sem eget pellentesque lacinia, neque mauris sodales nisi, et posuere lectus ante vel arcu. Praesent mollis tempus facilisis. Nam vulputate accumsan ex, vel egestas ipsum venenatis sed. Ut pharetra tellus at condimentum blandit. In hac habitasse platea dictumst. Mauris tincidunt felis in ex suscipit, eu ullamcorper purus vestibulum. Duis feugiat tellus ut quam mollis consequat. Suspendisse viverra tortor eu accumsan maximus.
      </li>
      <li>
        Vivamus facilisis enim et diam tincidunt tempus. Donec accumsan nisi vel eros mollis pellentesque. Nulla sed nulla vitae sapien placerat pretium sit amet vel mi. In id dictum magna, vel pellentesque nisl. Sed sollicitudin, tortor nec accumsan ornare, turpis turpis rutrum erat, quis faucibus orci nisl sit amet ligula. Donec commodo risus eget nunc luctus, eu tincidunt diam venenatis. Etiam venenatis turpis quis venenatis fermentum. Integer risus orci, porta ut aliquet id, eleifend sit amet neque.
      </li>
    </ul>
  )
}
