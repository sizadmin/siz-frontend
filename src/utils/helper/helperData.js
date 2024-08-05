export const SAMPLE_DATA_WHATSAPP_TEMPLATES = {
  success: true,
  message: 'Message Templates Fetched Successfully',
  data: {
    data: [
      {
        name: 'welcome_offer_2',
        status: 'APPROVED',
        language: 'en',
        components: [
          {
            type: 'BODY',
            text: "Heyyy {{1}},\n\nWe've missed you at Siz! As a valued sizters, here's an exclusive offer just for you.\n\nUse code *SUMMERSIZZING50 to get 50%* off on any rental. Rent the latest trends and stay stylish this summer season!\n\nThis limited-time offer won't last long. Book in advance now!\n\nReply to this message or text STOP to opt-out.",
            example: {
              body_text: [['Annabel']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'RENT NOW',
                url: 'https://www.siz.ae/',
              },
            ],
          },
        ],
        id: '1007927187706758',
      },
      {
        name: 'marketing_offer_1',
        status: 'APPROVED',
        language: 'en',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/317720761_810744287826025_7015331581507444700_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=LvgqlvFZK0IQ7kNvgEVJLWf&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIPy8Xwnquiph4kffqQUByP8kjP-PFPoz_hhIVMT2aHz1&oe=66CC417F',
              ],
            },
          },
          {
            type: 'BODY',
            text: "Heyyy {{1}},\n\nWe've missed you at Siz! As a valued sizters, here's an exclusive offer just for you.\n\nUse code *{{2}} to get {{3}}* off on any rental. Rent the latest trends and stay stylish this summer season!\n\nThis limited-time offer won't last long. Book in advance now!\n\nClick on Stop promotions to opt-out.",
            example: {
              body_text: [['Annabel', 'SIZZLINGSUMMER50 ', '50%']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'RENT NOW',
                url: 'https://www.siz.ae/',
              },
              {
                type: 'QUICK_REPLY',
                text: 'Stop promotions',
              },
            ],
          },
        ],
        id: '810744284492692',
      },
      {
        name: 'weelcome_offer_message',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/389667923_1224970832206915_9022706558879073900_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=v-aHrPDQZ9wQ7kNvgF_zMge&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaINok9XwTabFNeW5t52iKE7KPPUYFJzhxhWnYdSbebbk2&oe=66CC2ACC',
              ],
            },
          },
          {
            type: 'BODY',
            text: '😍 Double Your Savings with Sizters Welcome Offer 😍\n\nGet 10% off on your first rental order with Sizters App .\n\n👉  Use code : *WELCOMESIZ10*\n📆  Hurry, offer ends soon !\n😍 Enjoy your outfit and rock your event !\n\nDOWNLOAD THE APP NOW !\n\nT&Cs apply',
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'DOWNLOAD APP',
                url: 'https://siz.ae/pages/get-app',
              },
            ],
          },
        ],
        id: '1224970828873582',
      },
      {
        name: 'order_placement_pickup_schedule_lender',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/356041853_237728025774235_7248263094587325185_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=BXjeDx_NFBUQ7kNvgHqeQY_&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIOnlAA6nRvjSBAt-AjdQj7wcLj34cCrrqAHzfuFkGDlv&oe=66CC36EA',
              ],
            },
          },
          {
            type: 'BODY',
            text: "Hey there *{{1}}*,\n\nWe got a renter for your Item on siz.ae!\n\nOrder Details :\nItem :  *{{2}}* \nRental Duration : *{{3}}*\nDates : *{{4}}* To *{{5}}*\n\nPlease confirm the availability *{{2}}* on above dates and ensure it is clean and ready-to-wear upon pick up. \n\nIf it's available, kindly select your preferred pick-up time using the below button.\n\nIf any changes are needed, please inform us on Whatsapp on this link \nhttps://wa.me/971553674923\n\nThank you for sharing your closet with our sizterhood and for supporting sustainability in fashion and circular economy!\n\nThank You,\nSiz Team",
            example: {
              body_text: [['Kelly', 'Freya Dress', '4 Days', '06 July 2023', '09 July 2023']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'Schedule Pickup',
                url: 'https://logistics.siz.ae/pickup/{{1}}',
                example: ['https://logistics.siz.ae/pickup/1234'],
              },
            ],
          },
        ],
        id: '237728022440902',
      },
      {
        name: 'order_placement_with_delivery',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/353704779_658862232824444_8705547748586236037_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=38pq9PzVFhUQ7kNvgFQxGzm&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIBooiKziC98s17LEuVm-pa65PQIgpMsminBZXr4GbZ6u&oe=66CC2D0A',
              ],
            },
          },
          {
            type: 'BODY',
            text: "Hey there *{{1}}*, \nThank you for renting with siz.ae and for supporting sustainability in fashion and circular economy! We're certain you'll love the outfit you selected!\n\nYour Order Details:\nItem :  *{{2}}*\nRental Duration : *{{3}}*\nDates : *{{4}}* To *{{5}}*\n\nYour backup piece  *{{6}}* will also be prepared and delivered with your order so you are covered in (rare) occasions when a rental might not fit you or live up to your expectations.\n\nTo ensure that it will arrive on time, can you kindly \n(1) select your preferred delivery time slot using below button\n(2) send the Whatsapp location pin here\n\nhttps://wa.me/971553674923?text=Please%20share%20your%20location%20for%20smooth%20delivery%20experience\n\nplease so our driver can easily find your delivery address\n\nThank you! Happy renting, siz! 😊👗",
            example: {
              body_text: [['Annabel', 'Freya Dress', '4 Days', '06 July 2023', '09 July 2023', 'Alanis Dress']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'Schedule Delivery',
                url: 'https://logistics.siz.ae/delivery/{{1}}',
                example: ['https://logistics.siz.ae/delivery/1234'],
              },
            ],
          },
        ],
        id: '658862229491111',
      },
      {
        name: 'return_reminder_to_renter',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/354450241_173192579086068_1914442651532281281_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=iAeMZ20InjUQ7kNvgFQKoou&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIJrNY2h3Pxy9LO7wHflPPqoB9f5EfQrjznRvFv6w5Xxa&oe=66CC5936',
              ],
            },
          },
          {
            type: 'BODY',
            text: 'Hey *{{1}}* , \n\nYour rental period is coming to an end. We hope you enjoyed wearing the outfit! \n\nKindly let us know your preferred return pick-up time using the below button.\n\nThanks again for joining our sizterhood and for sharing the DREAM closet with siz.ae! 😊👗',
            example: {
              body_text: [['Kelly']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'Schedule Pickup',
                url: 'https://logistics.siz.ae/returnpickup/{{1}}',
                example: ['https://logistics.siz.ae/returnpickup/1234'],
              },
            ],
          },
        ],
        id: '173192575752735',
      },
      {
        name: 'pickup_reminder_to_lender',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/358789128_199272612777640_2196484567846152589_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=7p9_adOElDUQ7kNvgFpcJlQ&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIE6qdKWjmCJeRxV13rYR4HYhWwfwHn4Hxo9PrCzsMJzR&oe=66CC53DF',
              ],
            },
          },
          {
            type: 'BODY',
            text: 'Hi *{{1}}*, \n\nJust a friendly reminder that the pick-up of your item is scheduled for below dates .\n\nItem : *{{2}}*\nRental Duration : *{{3}}*\nDates : *{{4}} To {{5}}*\nPickup Scheduled On : *{{6}}*\nTimeSlot : *{{7}}*\n\nPlease ensure that the item is clean, ready-to-wear and packaged in the garment bag provided. \n\nThanks again for your invaluable support in promoting sustainability in the fashion industry. \n\nYour decision to share your closet with our sizterhood is making a significant positive impact on the environment.\n\nRegards,\nSiz Team',
            example: {
              body_text: [['Kelly', 'Freya Dress', '4 Days', '07 July 2023', '10 July 2023', '06 July 2023', '11 AM']],
            },
          },
        ],
        id: '199272609444307',
      },
      {
        name: 'update_on_drycleaning_complete',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/355632815_195960760091842_9191865077564752515_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=WPYQYRBSuzYQ7kNvgFfWATq&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaILJIXsEww_AWv9wZoQIUS-Gb_MV9yDWLkIhAAUoOosCe&oe=66CC5A39',
              ],
            },
          },
          {
            type: 'BODY',
            text: 'Hey there *{{1}}*, \n\nGreat news! *{{2}}* has been returned from the dry cleaner and is ready to be shared with another renter.\n\nWe wanted to update you on the payment of your earnings. \n\nPayments for rentals are processed bi-weekly, with payments scheduled every end of the week. \n\nYou can expect to receive your payment for *{{2}}* soon. \n\nThank you for being an essential part of our sizterhood! And please let us know if you have new items to list! \n\nThanks,\nSiz Team',
            example: {
              body_text: [['Kelly', 'Freya Dress']],
            },
          },
        ],
        id: '195960756758509',
      },
      {
        name: 'thankyou_feedback_renter',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/353228154_274105751970175_5518492407330387581_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=yD00qT9M6LMQ7kNvgHRLPvI&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIK0FmwS20HDsuO8E2wfgb58MlOT9Ejl_nxuteb8keEDX&oe=66CC4656',
              ],
            },
          },
          {
            type: 'BODY',
            text: "Hello *{{1}}*,\n\nWe hope you had a fabulous time with the rental outfit! \n\nYour return pick-up is scheduled for todayat *{{2}}*. \n\nThank you for being part of the sizterhood! \n\nWe'd love to hear your feedback on your rental experience and if you're also happy to share your beautiful photos to our sizterhood, we'd love to see how you styled the outfit! Feel free to tag us at *@siz.ae_official*! \n\nWe would be extremely grateful if you could take a moment to share your thoughts about your rental experience by leaving us  review using below button.\n\nYour feedback is essential to us as we strive to provide the best service possible and create a positive impact in the fashion rental sizterhood. 🙏👗\n\nRegards,\nSiz Team",
            example: {
              body_text: [['Kelly', '11 AM']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'Review Us',
                url: 'https://www.google.com/search?q=siz.ae&sxsrf=AB5stBh8Lz-zmwcyLeiEbvV3hjfC8TRLIQ%3A1688750927599&source=hp&ei=T0uoZLjjII-pkdUP5dCc8A4&iflsig=AD69kcEAAAAAZKhZX9p0lb3xteZNLbETkdLwZC8_ohmO&oq=siz&gs_lcp=Cgdnd3Mtd2l6EAMYADIHCCMQigUQJzIHCCMQigUQJzIECCMQJzIICAAQigUQkQIyCAgAEIAEELEDMgUIABCABDIICAAQgAQQsQMyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQ6DgguEIoFEMcBEK8BEJECOggIABCKBRCxAzoRCC4QgAQQsQMQgwEQxwEQ0QM6CggAEIAEEBQQhwI6CwguEIoFELEDEIMBOggILhCABBCxAzoICC4QigUQsQNQAFixAmDnD2gAcAB4AIAB6gKIAb8GkgEFMi0yLjGYAQCgAQE&sclient=gws-wiz#lrd=0x3e5f6b1a67c6afe1:0x277311618aff8b15,3,,,,',
              },
            ],
          },
        ],
        id: '274105748636842',
      },
      {
        name: 'delivery_reminder',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/357679238_565338212236298_3036980986472135508_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=t9qRLa0nkEcQ7kNvgFOCTeR&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIDlYYwvFNYWl5DYgLHd1tOziOaiwlswu15eP04_bbKkm&oe=66CC2825',
              ],
            },
          },
          {
            type: 'BODY',
            text: "Hi *{{1}}*, \n\nJust a friendly reminder that your rental outfit is scheduled for delivery tomorrow at *{{2}}*.\n\nOrder Details:\nItem :  *{{3}}*\nRental Duration : *{{4}}*\nDates: *{{5}} To {{6}}*\n \nWe hope you're as excited as we are! \n\nIf any changes are needed, please inform us on below link as soon as possible. Enjoy your rental experience! 🎉📦\n\nhttps://wa.me/971553674923\n\nThanks,\nSiz Team",
            example: {
              body_text: [['Annabel', '11 AM', 'Freya Dress', '4 Days', '07 July 2023', '10 July 2023']],
            },
          },
        ],
        id: '565338208902965',
      },
      {
        name: 'order_confirmed',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'Order Confirmed With Siz',
          },
          {
            type: 'BODY',
            text: "Hello {{1}},\n\nYour order for *{{2}}* is confirmed for *{{3}}*.\n\nPlease schedule your delivery using below button and don't forget to share your location here .\n\nThanks,\nSiz Team",
            example: {
              body_text: [['Annabel', 'Freya Dress', '03 July 2023']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'Schedule Delivery',
                url: 'https://delivery.siz.ae/delivery/1234{{1}}',
                example: ['https://delivery.siz.ae/delivery/1234'],
              },
            ],
          },
        ],
        id: '6824563697555145',
      },
      {
        name: 'update_pickup_drycleaner',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
            example: {
              header_handle: [
                'https://scontent.whatsapp.net/v/t61.29466-34/353144081_965547944730935_1765544452883001462_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=azttNRe4vgMQ7kNvgFLFau1&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIPIIHyv1RJkgs2nV_rCLSkvgFBm69fqGuj6h8G3NIts1&oe=66CC56E3',
              ],
            },
          },
          {
            type: 'BODY',
            text: "Hello *{{1}}*,\n\nWe wanted to inform you that  *{{2}}* has been picked up by our drycleaning partner from the renter.\n\n It will now be taken to the dry cleaner for cleaning and we'll let you know once it's on its way back to you. \n\nWe appreciate your contribution to the rental community and the sustainability movement!\n\nThanks,\nSiz Team",
            example: {
              body_text: [['Kelly', 'Freya Dress']],
            },
          },
        ],
        id: '965547941397602',
      },
      {
        name: 'order_pickup_lender',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'You Got a New Renter from Siz',
          },
          {
            type: 'BODY',
            text: 'Hi {{1}},\n\nGreat news! A renter has shown interest in your piece *{{2}}* and would like to rent it for the following dates: *{{3}}* to *{{4}}*. They absolutely love your item!\n\nCould you please help us arrange the pickup? Kindly schedule the pickup using the following button .\n\nThank you for your cooperation in making this rental possible. We truly appreciate your contribution to our platform.\n\nBest regards,\nSiz Team',
            example: {
              body_text: [['Kelly', 'Freya Dress', '03 July 2023', '07 July 2023']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'Schedule Pickup',
                url: 'https://pickup.siz.ae/pickup{{1}}',
                example: ['https://pickup.siz.ae/pickup/1234'],
              },
            ],
          },
        ],
        id: '117575001386549',
      },
      {
        name: 'hello_world',
        status: 'APPROVED',
        language: 'en_US',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'Hello World',
          },
          {
            type: 'BODY',
            text: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.',
          },
          {
            type: 'FOOTER',
            text: 'WhatsApp Business Platform sample message',
          },
        ],
        id: '3328743687437220',
      },
    ],
    paging: {
      cursors: {
        before: 'MAZDZD',
        after: 'MjQZD',
      },
    },
  },
};
