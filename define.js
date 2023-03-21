const game = {
  data: {
    current: 0,
    time: {
      countdown: 3,
      voting: 5
    },
    status: null,
    lists:
      [
        {
          "question": 'คนกลุ่มไหนในองค์กรที่ใช้ ทักษะการเล่าเรื่องบ่อยครั้ง?',
          "answer": [
            { text: 'แม่บ้าน', score: { default: 18.2, vote: 0 } },
            { text: 'พนักงานฝ่ายขาย', score: { default: 40, vote: 0 } },
            { text: 'ผู้บริหารระดับสูง', score: { default: 27.3, vote: 0 } },
            { text: 'ฝ่าย HR', score: { default: 9, vote: 0 } },
            { text: 'หัวหน้าแผนก', score: { default: 5, vote: 0 } }
          ]
        },
        {
          "question": 'ใครในองค์กรที่มามีส่วนร่วมกับการเรียนรู้แล้วจะมีประสิทธิภาพสูงที่สุด?',
          "answer": [
            { text: 'เจ้าตัว/ผู้เรียน', score: { default: 30, vote: 0 } },
            { text: 'CEO', score: { default: 9.1, vote: 0 } },
            { text: 'หัวหน้างาน', score: { default: 44.5, vote: 0 } },
            { text: 'เพื่อนร่วมงาน', score: { default: 6.4, vote: 0 } },
            { text: 'HR', score: { default: 10, vote: 0 } }
          ]
        },
        {
          "question": 'หน้าที่ของผู้เข้าอบรมต้องทำอะไรบ้าง?',
          "answer": [
            { text: 'ตั้งใจเรียน', score: { default: 45.5, vote: 0 } },
            { text: 'มาตรงเวลา', score: { default: 7, vote: 0 } },
            { text: 'ทำกิจกรรม', score: { default: 20.3, vote: 0 } },
            { text: 'ถามคำถาม', score: { default: 9.1, vote: 0 } },
            { text: 'แบ่งปันประสบการณ์', score: { default: 18.2, vote: 0 } }
          ]
        },
        {
          "question": 'ปัญหาที่ผู้จัดเจอในการจัดอบรมคืออะไร?',
          "answer": [
            { text: 'คนเรียนไม่มีเวลา', score: { default: 45.5, vote: 0 } },
            { text: 'ไม่มีงบประมาณ', score: { default: 9.1, vote: 0 } },
            { text: 'ติดตามผลยาก', score: { default: 8.2, vote: 0 } },
            { text: 'เรียนแล้วไม่นำไปใช้', score: { default: 10, vote: 0 } },
            { text: 'ไม่ให้ความร่วมมือ', score: { default: 27.3, vote: 0 } }
          ]
        },
        {
          "question": 'ประโยชน์ของทีมที่มีความหลากหลายในการทำงานมีอะไรบ้าง?',
          "answer": [
            { text: 'มีไอเดียหลากหลาย , มุมมองใหม่ๆ', score: { default: 51.8, vote: 0 } },
            { text: 'ดึงดูดบุคลากรเข้ามาได้ง่ายขึ้น', score: { default: 8, vote: 0 } },
            { text: 'ปรับปรุงภาพลักษณ์องค์กร', score: { default: 15, vote: 0 } },
            { text: 'ช่วยเพิ่มความผูกพันของพนักงาน', score: { default: 10, vote: 0 } },
            { text: 'ตอบสนองต่อลูกค้าที่หลากหลาย', score: { default: 15.2, vote: 0 } }
          ]
        },
      ]
  }
}
module.exports = { game };