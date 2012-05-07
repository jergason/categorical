(function () {
  "use strict";


  /**
   * Creates and returns a categorical distribution.
   *
   * @param {Array} items An array of items to use to create the distribution.
   * @param {Function(item)} scoreFunction Function that returns a numeric score
   *  for an individual item.
   *
   * @return {Array} The distribution. An array of objects containing the
   *  probability windows for each item, along with the item itself.
   *
   */
  function createDistribution(items, scoreFunction) {
    var distro = []
      , item
      , totalScore = 0
      , normalizer
      , probabilityAccumulator = 0
      ;

    function calculateTopScore(item) {
      totalScore += scoreFunction(item);
    }

    items.forEach(calculateTopScore);

    // For it to be a probablity distribution, all of the scores need to add up to 1
    // so we normalize
    // 1 = toralScore * normalizer
    // 1 / totalScore = normalizer
    normalizer = 1 / totalScore;

    function addItemToDistribution(item) {
      var normalizedItemScore
        ;
      normalizedItemScore = scoreFunction(item) * normalizer;
      distro.push({ probStart: probabilityAccumulator, probEnd: probabilityAccumulator + normalizedItemScore, item: item });
      probabilityAccumulator += normalizedItemScore;
    }

    // Create probablity "buckets" for each item.
    // So the larger the score, the wider the range, and more likely a random number
    // between 0 and 1 will fall in to its range, meaning the more likely it is to be picked.
    // |_item 1______|__item 2_|________________item 3_________|
    items.forEach(addItemToDistribution);

    return distro;
  }


  /**
   * Draw a random item from the distribution.
   *
   * @param {Array} distribution the distribution returned from a call to createDistribution.
   * @return {Object} The random item returned from the distribution.
   */
  function getRandomItem(distribution) {
    var rand = Math.random()
     , i = 0
     ;

    // loop until we find an item from the distribution where `rand` falls between the start and end values.
    // TODO: replace with a binary search for faster draws
    while (i < distribution.length) {
      if (rand >= distribution[i].probStart && rand <= distribution[i].probEnd) {
        return distribution[i].item;
      }

      i++;
    }
    throw new Error('Reached end of distribution without finding anything. This should not happen!');
  }

  module.exports = {
      createDistribution: createDistribution
    , draw: getRandomItem
  };
}());
