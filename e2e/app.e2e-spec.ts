import { EvolutionTestPage } from './app.po';

describe('evolution-test App', function() {
  let page: EvolutionTestPage;

  beforeEach(() => {
    page = new EvolutionTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
