const { Menu, MenuItem } = require('electron').remote

const accelerator = 'CommandOrControl+S'

const submit = new MenuItem(
    {
        label: 'Submit',
        click: function (menuItem, browserWindow) {
            console.log(menuItem);
        },
        accelerator: 'CommandOrControl+S'
    })
const wipe = new MenuItem(
    {
        label: 'wipe',
        click: function (menuItem, browserWindow) {
            removeFiles()
        },
        accelerator: 'CommandOrControl+D'
    })


const template = [
    // {
    //     label: 'Conversion',
    //     submenu: [
    //         submit,
    //         new MenuItem({ type: 'separator' }),
    //         wipe
    //     ]
    // },
    {
        label: 'View',
        submenu: [
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'togglefullscreen' },
            { type: 'separator' },
            { role: 'forcereload' }

        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
