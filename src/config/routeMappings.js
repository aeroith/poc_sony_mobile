const routeMappings = [
  {
    routeName: 'TVGuide',
    enum: 'tv_guide',
  },
  {
    routeName: 'Programs',
    enum: 'programs',
    noFloat: true,
  },
  {
    routeName: 'Galleries',
    enum: 'galleries',
    noFloat: true,
  },
  {
    routeName: 'News',
    enum: 'news',
    noFloat: true,
  },
  {
    routeName: 'GamesAndMore',
    enum: 'games_and_more',
    noFloat: true,
  },
  {
    routeName: 'Settings',
    enum: 'settings',
    uniqueMenuItem: true,
    noFloat: true,
  },
  {
    routeName: 'Notifications',
    enum: 'notifications',
    uniqueMenuItem: true,
    noFloat: true,
  },
  {
    routeName: 'LiveFeed',
    enum: 'livefeed',
    uniqueMenuItem: true,
    noFloat: true,
  },
  {
    routeName: 'Program',
    enum: 'program',
    onlyBack: true,
  },
];

export default routeMappings;
