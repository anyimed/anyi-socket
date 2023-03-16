const game = {
  current: 0,
  lists:
    [
      {
        "question": 'อะไรเอ่ย',
        "answer": [
          { text: 'ปาก', score: { default: 40, vote: 0 } },
          { text: 'ตูด', score: { default: 30, vote: 0 } },
          { text: 'หู', score: { default: 20, vote: 0 } },
          { text: 'หัว', score: { default: 10, vote: 0 } },
          { text: 'ผม', score: { default: 5, vote: 0 } }
        ],
        sum: 0
      },
      {
        "question": 'อะไรเอ่ย22',
        "answer": [
          { text: 'ปาก22', score: { default: 40, vote: 0 } },
          { text: 'ตูด22', score: { default: 30, vote: 0 } },
          { text: 'หู22', score: { default: 20, vote: 0 } },
          { text: 'หัว22', score: { default: 10, vote: 0 } },
          { text: 'ผม22', score: { default: 5, vote: 0 } }
        ]
      },
      {
        "question": 'อะไรเอ่ย333',
        "answer": [
          { text: 'ปาก333', score: { default: 40, vote: 0 } },
          { text: 'ตูด333', score: { default: 30, vote: 0 } },
          { text: 'หู333', score: { default: 20, vote: 0 } },
          { text: 'หัว333', score: { default: 10, vote: 0 } },
          { text: 'ผม333', score: { default: 5, vote: 0 } }
        ]
      },
      {
        "question": 'อะไรเอ่ย4444',
        "answer": [
          { text: 'ปาก4444', score: { default: 40, vote: 0 } },
          { text: 'ตูด4444', score: { default: 30, vote: 0 } },
          { text: 'หู4444', score: { default: 20, vote: 0 } },
          { text: 'หัว44444', score: { default: 10, vote: 0 } },
          { text: 'ผม44444', score: { default: 5, vote: 0 } }
        ]
      },
    ]
}

module.exports = { game };