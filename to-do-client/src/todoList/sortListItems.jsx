const sort = (compare, elements) => {
  if (Array.isArray(elements)) {
    let inOrder;

    do {
      inOrder = true; // Assume that the array is in order

      for (
        let index = 0, length = elements.length - 1;
        index < length;
        index++
      ) {
        const leftElement = elements[index];
        const rightElement = elements[index + 1];

        if (compare(leftElement, rightElement) > 0) {
          elements[index] = rightElement;
          elements[index + 1] = leftElement;
          inOrder = false; // The array wasn't in order, so swap elements and then check it again.
        }
      }
    } while (inOrder === false);
  }
  return elements;
};

export function sortItemsByTitleAsc(items) {
  const compareTitle = (left, right) => {
    const leftTitleSpaces = left.title.toLowerCase();
    const rightTitleSpaces = right.title.toLowerCase();

    const leftTitle = leftTitleSpaces.replace(/\s+/g, "");
    const rightTitle = rightTitleSpaces.replace(/\s+/g, "");

    if (leftTitle !== rightTitle) {
      for (let i = 0; i < leftTitle.length; i++) {
        if (leftTitle.charCodeAt(i) !== rightTitle.charCodeAt(i)) {
          return leftTitle.charCodeAt(i) - rightTitle.charCodeAt(i);
        }
      }
      return 0;
    }
  };
  return sort(compareTitle, items);
}

export function sortItemsByTitleDesc(items) {
  const compareTitle = (left, right) => {
    const leftTitle = left.title.toLowerCase();
    const rightTitle = right.title.toLowerCase();

    //const leftTitle = leftTitleSpaces.replace(/\s+/g, "");
    //const rightTitle = rightTitleSpaces.replace(/\s+/g, "");

    if (leftTitle !== rightTitle) {
      for (let i = 0; i < leftTitle.length; i++) {
        if (leftTitle.charCodeAt(i) !== rightTitle.charCodeAt(i)) {
          return rightTitle.charCodeAt(i) - leftTitle.charCodeAt(i);
        }
      }
      return 0;
    }
  };
  return sort(compareTitle, items);
}

export function sortItemsByDueDateDesc(items) {
  const compareDueDate = (left, right) => {
    console.log(`left: ${left}, right: ${right}`);
    const leftDueDate = new Date(left["due-date"]["date_string"]);
    const rightDueDate = new Date(right["due-date"]["date_string"]);

    if (leftDueDate.valueOf() !== rightDueDate.valueOf()) {
      return rightDueDate.valueOf() - leftDueDate.valueOf();
    }
    return 0;
  };
  return sort(compareDueDate, items);
}

function sortItemsByDueDateAsc(items) {
  const compareDueDate = (left, right) => {
    console.log(`left: ${left}, right: ${right}`);
    const leftDueDate = new Date(left["due-date"]["date_string"]);
    const rightDueDate = new Date(right["due-date"]["date_string"]);

    if (leftDueDate.valueOf() !== rightDueDate.valueOf()) {
      return leftDueDate.valueOf() - rightDueDate.valueOf();
    }
    return 0;
  };
  return sort(compareDueDate, items);
}