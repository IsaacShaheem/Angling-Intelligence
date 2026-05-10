export const nearbyWatersResponse = {
  location: 'Guelph',
  coordinates: {
    lat: 43.5448,
    lon: -80.2482,
  },
  weather: {
    tempC: 14,
    condition: 'Cloudy',
    windKph: 18,
    season: 'Spring',
    insight: 'Cloud cover, cool water, and a light chop should favor structure-oriented presentations today.',
  },
  waters: [
    {
      id: 'guelph-lake',
      name: 'Guelph Lake',
      distanceKm: 7,
      type: 'Reservoir',
      region: 'Guelph / Wellington',
      pressureLevel: 'high',
      accessibility: 'high',
      speciesCount: 5,
      lat: 43.59,
      lon: -80.25,
      bestWindow: 'Late afternoon',
      shoreline: 'Weed edges, points, shallow bays',
    },
    {
      id: 'belwood-lake',
      name: 'Belwood Lake',
      distanceKm: 23,
      type: 'Reservoir',
      region: 'Centre Wellington',
      pressureLevel: 'medium',
      accessibility: 'medium',
      speciesCount: 6,
      lat: 43.79,
      lon: -80.32,
      bestWindow: 'Morning',
      shoreline: 'Timber, weedlines, deeper basins',
    },
    {
      id: 'conestogo-lake',
      name: 'Conestogo Lake',
      distanceKm: 31,
      type: 'Reservoir',
      region: 'Mapleton',
      pressureLevel: 'low',
      accessibility: 'medium',
      speciesCount: 4,
      lat: 43.68,
      lon: -80.72,
      bestWindow: 'Evening',
      shoreline: 'Creek arms, flats, submerged wood',
    },
  ],
}

export const waterResponses = {
  'guelph-lake': {
    water: {
      id: 'guelph-lake',
      name: 'Guelph Lake',
      type: 'Reservoir',
      region: 'Guelph / Wellington',
      pressureLevel: 'high',
      accessibility: 'high',
      shoreline: 'Weed edges, points, shallow bays',
      bestWindow: 'Late afternoon',
    },
    speciesScores: [
      {
        species: 'Northern Pike',
        score: 72,
        difficulty: 'Medium',
        methods: ['Spinnerbait', 'Spoon', 'Jerkbait'],
        reasons: [
          'Cloudy windy conditions favour ambush predators.',
          'Fishing pressure slightly reduces score.',
        ],
        shortExplanation:
          'Pike are a strong option today because windy overcast conditions improve feeding activity.',
        aiTip:
          'Focus on shallow weed edges and transition zones using spinnerbaits during low-light periods.',
      },
      {
        species: 'Smallmouth Bass',
        score: 84,
        difficulty: 'Medium',
        methods: ['Tube jig', 'Ned rig', 'Suspending jerkbait'],
        reasons: [
          'Broken light helps fish hold shallower around rock and weed transitions.',
          'Wind adds surface disruption and makes moving baits more convincing.',
        ],
        shortExplanation:
          'Smallmouth are one of the better targets today around rocky transitions and wind-facing points.',
        aiTip:
          'Start with a jerkbait on wind-blown banks, then slow down with a tube once you contact rock.',
      },
      {
        species: 'Muskellunge',
        score: 34,
        difficulty: 'Very Hard',
        methods: ['Large swimbaits', 'Bucktails'],
        reasons: [
          'Cold water temperatures reduce activity.',
          'Muskellunge are naturally difficult to target.',
        ],
        shortExplanation:
          'Muskellunge are possible but conditions are currently challenging.',
        aiTip:
          'Target deeper structure slowly with large presentations during warmer afternoon periods.',
      },
    ],
  },
  'belwood-lake': {
    water: {
      id: 'belwood-lake',
      name: 'Belwood Lake',
      type: 'Reservoir',
      region: 'Centre Wellington',
      pressureLevel: 'medium',
      accessibility: 'medium',
      shoreline: 'Timber, weedlines, deeper basins',
      bestWindow: 'Morning',
    },
    speciesScores: [
      {
        species: 'Northern Pike',
        score: 83,
        difficulty: 'Easy',
        methods: ['Spoon', 'Inline spinner', 'Suspending jerkbait'],
        reasons: [
          'Cloudy spring weather supports longer shallow feeding windows.',
          'Lower pressure than urban waters improves the setup.',
        ],
        shortExplanation:
          'Northern Pike are a standout option around warming shoreline cover and creek-influenced bays.',
        aiTip:
          'Run a spoon high over emerging weeds first, then pause a jerkbait beside visible lanes.',
      },
      {
        species: 'Muskellunge',
        score: 69,
        difficulty: 'Hard',
        methods: ['Bucktail', 'Glide bait', 'Large swimbait'],
        reasons: [
          'Wind can position baitfish along main-lake structure.',
          'Cool water keeps activity windows shorter.',
        ],
        shortExplanation:
          'Muskellunge are viable for patient anglers willing to focus on high-value structure.',
        aiTip:
          'Work wind-facing points slowly and finish every retrieve with a deliberate boatside turn.',
      },
      {
        species: 'Walleye',
        score: 61,
        difficulty: 'Medium',
        methods: ['Jig and minnow', 'Slow crankbait', 'Slip float'],
        reasons: [
          'Overcast skies help extend low-light behavior.',
          'Daytime wind can make precise bottom contact harder.',
        ],
        shortExplanation:
          'Walleye are worth considering near breaks, especially if you can fish into the evening.',
        aiTip:
          'Hold on the first break near creek influence and keep your presentation close to bottom.',
      },
    ],
  },
  'conestogo-lake': {
    water: {
      id: 'conestogo-lake',
      name: 'Conestogo Lake',
      type: 'Reservoir',
      region: 'Mapleton',
      pressureLevel: 'low',
      accessibility: 'medium',
      shoreline: 'Creek arms, flats, submerged wood',
      bestWindow: 'Evening',
    },
    speciesScores: [
      {
        species: 'Walleye',
        score: 81,
        difficulty: 'Medium',
        methods: ['Jig', 'Slow crankbait', 'Live bait rig'],
        reasons: [
          'Overcast conditions can extend the transition bite.',
          'Creek arms and hard-bottom breaks create strong evening targets.',
        ],
        shortExplanation:
          'Walleye line up well today if you focus on evening movement near creek arms and breaks.',
        aiTip:
          'Pick one productive break and work it slowly instead of covering too much water.',
      },
      {
        species: 'Northern Pike',
        score: 74,
        difficulty: 'Easy',
        methods: ['Spinnerbait', 'Jerkbait', 'Swim jig'],
        reasons: [
          'Cool spring temperatures keep activity near warming shallows.',
          'Wind adds cover for reaction presentations.',
        ],
        shortExplanation:
          'Pike remain a good target around shallow flats with emerging vegetation.',
        aiTip:
          'Target the warmest protected pockets first, then move to wind-exposed weed edges.',
      },
      {
        species: 'Smallmouth Bass',
        score: 57,
        difficulty: 'Hard',
        methods: ['Drop shot', 'Hair jig', 'Finesse swimbait'],
        reasons: [
          'Less obvious rocky habitat makes patterning slower.',
          'Cool pockets can reduce reaction bites.',
        ],
        shortExplanation:
          'Smallmouth are possible, but today favours slower and more precise structure fishing.',
        aiTip:
          'Downsize and drag baits slowly across hard-bottom changes near deeper water.',
      },
    ],
  },
}
