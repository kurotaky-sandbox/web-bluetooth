const SERVICE_UUID = 'SERVICE_UUIDを書く'
const CHARACTERISTIC_UUID = 'CHARACTERISTIC_UUIDを書く'

const btn = document.getElementById('btn')
const counter = document.getElementById('counter')
const counter2 = document.getElementById('counter2')

// click button and start connection
btn.addEventListener('click', (event) => {
  connect()
})

const connect = () => {
  // Scan
  navigator.bluetooth.requestDevice({
    acceptAllDevices: false,
    filters: [
      { namePrefix: 'odanXX' }  // Bluetoothで探す名前を指定
    ],
    optionalServices: [
      // 使用したいServiceを登録
      SERVICE_UUID
    ]
  })
    // 接続
    .then(device => device.gatt.connect())
    // Service取得
    .then(server => server.getPrimaryService(SERVICE_UUID))
    // Characteristic取得
    .then(service => service.getCharacteristic(CHARACTERISTIC_UUID))
    // Notificationsを開始
    .then(characteristic => setNotifications(characteristic))
    // Errorはこちら
    .catch(error => console.log(error))
}

// Notification設定
const setNotifications = (characteristic) => {

  // Add Event
  characteristic.addEventListener('characteristicvaluechanged', (event) => {
    const value = event.target.value

    // json形式のパース用のコード
    // const decoder = new TextDecoder('utf-8')
    // const str = decoder.decode(value)
    // const json = JSON.parse(str)
    // console.log(json)
    // // データを表示
    var uintArray = new Uint8Array(value.buffer);
     if (uintArray) {
       counter.innerHTML = uintArray // htmlにセットする
       counter2.innerHTML = uintArray[0].toString(16) + uintArray[1].toString(16) + uintArray[2].toString(16) + uintArray[3].toString(16)
     }
    console.log(uintArray)
  })

  // Notifications開始
  characteristic.startNotifications()
}
