function filterCheckHandler(checkbox) {
  if (checkbox.checked == true) {
    showAllPanels();
  } else {
    filterTools();
  }
}

function showAllPanels() {
  var panels = $(document.getElementsByClassName('link-panel-container'));
  for (var i = 0, len = panels.length; i < len; i++) {
    showPanel(panels[i]);
  }
}

function hidePanel(panel) {
  panel.style.display = "none";
}

function showPanel(panel) {
  panel.style.display = "block";
}

function evalTags(panelTags, filterTags) {

  for (var i = 0, len = filterTags.length; i < len; i++) {
    if (!panelTags.includes(filterTags[i])) {
      return false;
    }
  }
  return true;
}

function showPanelByTag(panel, filterTags) {
  var tags = panel.dataset.tags;

  if (evalTags(tags, filterTags)) {
    panel.style.display = "block"
  }
}

function getTagsSelected(options) {
  var result = [];
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

function filterTools() {
  var filterTags = getTagsSelected($(document.getElementById('tags-select'))["0"].options);
  var tools = $(document.getElementsByClassName('link-panel-container'));

  // hide the panels to start
  for (var i = 0, len = tools.length; i < len; i++) {
    hidePanel(tools[i]);
  }

  // show the panels for each tag
  for (var j = 0, len = tools.length; j < len; j++) {
    showPanelByTag(tools[j], filterTags);
  }
}

var select = document.getElementById('tags-select');
multi(select, {
    search_placeholder: 'Search tags...',
});