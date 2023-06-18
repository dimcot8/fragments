const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('../../src/model/data/memory');

describe('Memory Database Backend', () => {
  const testOwnerId = 'testOwner';
  const testFragmentId = 'testFragment';
  let testFragment;
  const testData = Buffer.from('test data');

  beforeEach(() => {
    testFragment = {
      ownerId: testOwnerId,
      id: testFragmentId,
      created: new Date(),
      updated: new Date(),
      type: 'text',
      size: 0,
    };
  });

  it('writes and reads fragment', async () => {
    await writeFragment(testFragment);
    const result = await readFragment(testOwnerId, testFragmentId);
    expect(result).toEqual(testFragment);
  });

  it('writes and reads fragment data', async () => {
    await writeFragmentData(testOwnerId, testFragmentId, testData);
    const result = await readFragmentData(testOwnerId, testFragmentId);
    expect(result).toEqual(testData);
  });

  it('lists fragments correctly', async () => {
    const result = await listFragments(testOwnerId);
    expect(result).toContain(testFragmentId);
  });

  it('deletes fragments data and metadata', async () => {
    await deleteFragment(testOwnerId, testFragmentId);
    const metadataResult = await readFragment(testOwnerId, testFragmentId);
    const dataResult = await readFragmentData(testOwnerId, testFragmentId);
    expect(metadataResult).toBeUndefined();
    expect(dataResult).toBeUndefined();
  });
});
