import { ViewedEventTracker } from './ViewedEvent';

const completedBlocksKeys = new Set();

export function markBlocksCompletedOnViewIfNeeded(runtime, containerElement) {

  const blockElements = $(containerElement).find(
    '.xblock-student_view[data-mark-completed-on-view-after-delay]',
  ).get();


  if (blockElements.length > 0) {

    console.log('blockElement greater than 0----')

    const tracker = new ViewedEventTracker();


    blockElements.forEach((blockElement) => {

      console.log('blockElement12----',blockElement);

      const markCompletedOnViewAfterDelay = parseInt(
        blockElement.dataset.markCompletedOnViewAfterDelay, 10,
      );
      if (markCompletedOnViewAfterDelay >= 0) {
        tracker.addElement(blockElement, markCompletedOnViewAfterDelay);
      }
    });

    tracker.addHandler((blockElement, event) => {      
      const blockKey = blockElement.dataset.usageId;

      console.log('blockElement--here------',blockElement)
      console.log('events1----',event);
      console.log('blockKey------',blockKey);
      console.log('publish_completion------',runtime.handlerUrl(blockElement, 'publish_completion'));
      console.log('completedBlocksKeys1-------',completedBlocksKeys.has(blockKey));

      if (blockKey && !completedBlocksKeys.has(blockKey)) {
        console.log('event element----',event.elementHasBeenViewed);
        if (event.elementHasBeenViewed) {
          $.ajax({
            type: 'POST',
            url: runtime.handlerUrl(blockElement, 'publish_completion'),
            data: JSON.stringify({
              completion: 1.0,
            }),
          }).then(
            () => {              
              completedBlocksKeys.add(blockKey);
              console.log('completed log----blockkey', completedBlocksKeys);              
              blockElement.dataset.markCompletedOnViewAfterDelay = 0;
            },
          );
        }
      }
    });
  }
}
