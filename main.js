import { LocalNotifications } from '@capacitor/local-notifications';

const trainingSchedule = [
  { start: new Date('2026-04-13'), text: 'Неделя 1: ЛФК 3р/д PEP-терапия. Изометрия 3х45с. Вело 45 км (Зона 1).' },
  { start: new Date('2026-04-20'), text: 'Неделя 2: ЛФК PEP + мобилизация. Изометрия 5х45с. Вело 60 км.' },
  { start: new Date('2026-04-27'), text: 'Неделя 3: ЛФК 2р/д. Изометрия-одноногая 5х45с. Вело 75 км.' },
  { start: new Date('2026-05-04'), text: 'Неделя 4: ЛФК утром. Изометрия-одноногая 5х45с. Вело 90 км.' },
  { start: new Date('2026-05-11'), text: 'Неделя 5: HSR приседания (3 вверх, 3 вниз). Вело 90 км. Ходьба 40 мин.' },
  { start: new Date('2026-05-18'), text: 'Неделя 6: HSR протокол (3х12). Вело 100 км. Ходьба 50 мин.' },
  { start: new Date('2026-05-25'), text: 'Неделя 7: HSR голень. Вело 110 км. Ходьба 60 мин.' },
  { start: new Date('2026-06-01'), text: 'Неделя 8: Walk-to-Run (4м шаг/1м легкий бег х 6). Вело 90 км.' },
  { start: new Date('2026-06-08'), text: 'Неделя 9: HSR 2р/нед. Вело 90 км. Бег: 3м шаг / 2м бег х 6.' },
  { start: new Date('2026-06-15'), text: 'Неделя 10: Силовые 2р/нед. Вело 70 км. Бег: 2м шаг / 3м бег х 6.' },
  { start: new Date('2026-06-22'), text: 'Неделя 11: Бег (Вт: 6км, Сб: 8км). Вело (Чт: 30км, Вс: 40км).' },
  { start: new Date('2026-06-29'), text: 'Неделя 12: Силовые 1р/нед. Вело 50 км. Бег: 1м шаг / 9м бег х 4.' },
  { start: new Date('2026-07-06'), text: 'Неделя 13: Непрерывный бег 30 мин (3 раза). Вело 60 км.' },
  { start: new Date('2026-07-13'), text: 'Неделя 14: Разгрузка. Бег 20 мин легким темпом. Вело 30 км.' },
  { start: new Date('2026-07-20'), text: 'Неделя 15: Бег (Вт: 6км, Чт: 6км, Вс: 10км). Вело 30 км.' },
  { start: new Date('2026-07-27'), text: 'Неделя 16: Бег (Вт: 7км, Чт: 7км, Вс: 12км). Вело 30 км.' },
  { start: new Date('2026-08-03'), text: 'Неделя 17: Бег (Вт: 8км, Чт: 8км, Вс: 14км). Вело 30 км.' },
  { start: new Date('2026-08-10'), text: 'Неделя 18: Бег (Вт: 8км, Чт: 8км, Вс: 16км). Вело 20 км.' },
  { start: new Date('2026-08-17'), text: 'Неделя 19 (Пик 1): Бег (Вт: 10км, Чт: 8км, Вс: 18км). Обязательно КОЛЛАГЕН!' },
  { start: new Date('2026-08-24'), text: 'Неделя 20: Разгрузка. Бег (Вт: 6км, Чт: 6км, Вс: 12км). Вело исключен.' },
  { start: new Date('2026-08-31'), text: 'Неделя 21 (Пик 2): Бег (Вт: 10км, Чт: 8км, Вс: 20км). Без силовых.' },
  { start: new Date('2026-09-07'), text: 'Неделя 22: Тейпер 1 (Снижение объемов). Бег (Вт: 8км, Чт: 6км, Вс: 14км). Вело 20км.' },
  { start: new Date('2026-09-14'), text: 'Неделя 23: Тейпер 2. Бег (Вт: 6км, Чт: 5км, Вс: 10км). Вело исключен.' },
  { start: new Date('2026-09-21'), text: 'Неделя 24 (Гоночная): Вт 5км, Чт 3км. Пт/Сб отдых. ВС - ПОЛУМАРАФОН!' }
];

async function setupNotifications() {
  let permStatus = await LocalNotifications.checkPermissions();
  if (permStatus.display !== 'granted') {
    permStatus = await LocalNotifications.requestPermissions();
  }
  if (permStatus.display !== 'granted') {
    alert('Уведомления не разрешены операционной системой.');
    return;
  }

  await LocalNotifications.cancel({ notifications: await LocalNotifications.getPending() });

  const notifications = [];
  let idAcc = 1;

  const now = new Date();
  
  // Schedule notifications for the next 30 days
  for (let i = 0; i < 30; i++) {
    const curDateBase = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    
    // 8:00 AM - Vitamins Morning + Plan
    const v8am = new Date(curDateBase.getFullYear(), curDateBase.getMonth(), curDateBase.getDate(), 8, 0, 0);
    if (v8am > now) {
      notifications.push({
        id: idAcc++,
        title: 'Утренний прием витаминов 💊',
        body: 'Принять: Вит E (400 ME), Селен (200 мкг), Вит C, Коллаген (15-20г).',
        schedule: { at: v8am }
      });
    }

    // 8:05 AM - Training Plan
    const t805am = new Date(curDateBase.getFullYear(), curDateBase.getMonth(), curDateBase.getDate(), 8, 5, 0);
    if (t805am > now) {
        let activeWeekText = "Продолжайте поддержку, следите за самочувствием.";
        for (let w = trainingSchedule.length - 1; w >= 0; w--) {
          if (t805am >= trainingSchedule[w].start) {
            activeWeekText = trainingSchedule[w].text;
            break;
          }
        }
        notifications.push({
          id: idAcc++,
          title: '⚡ План на сегодня',
          body: activeWeekText,
          schedule: { at: t805am }
        });
    }

    // 21:00 PM - Vitamins Evening
    const v9pm = new Date(curDateBase.getFullYear(), curDateBase.getMonth(), curDateBase.getDate(), 21, 0, 0);
    if (v9pm > now) {
      notifications.push({
        id: idAcc++,
        title: 'Вечерний прием витаминов 🌙',
        body: 'Принять: Магний (400-600мг) и Вит C (500-1000мг).',
        schedule: { at: v9pm }
      });
    }
  }

  await LocalNotifications.schedule({ notifications });
  alert('Уведомления успешно включены! Настроено расписание на ближайшие 30 дней.');
}

window.setupNotifications = setupNotifications;
