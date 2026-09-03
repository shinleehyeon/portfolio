(function() {
  'use strict';

  var COLORS = [
    '#B43145', '#2D80FD', '#388E3C', '#E65100',
    '#7B1FA2', '#6B6666', '#6B6666', '#00838F', '#F9A825'
  ];
  var FILLS = [
    '#FFE6E8', '#D1E3FF', '#D4EDDA', '#FFE0B2',
    '#E1D5E7', '#E8E3E3', '#E8E3E3', '#B2EBF2', '#FFF9C4'
  ];

  function isDarkTheme() {
    return document.documentElement.dataset.theme === 'dark';
  }
  // Root node + default (uncolored) node palette, theme-aware.
  var PAL = isDarkTheme()
    ? { rootBg: '#F5F0F0', rootText: '#181212', nodeBg: '#2B2525', nodeText: '#F5F0F0', muted: 'rgba(24,18,18,0.7)', mutedText: '#9B9596', stroke: '#554F4F' }
    : { rootBg: '#181212', rootText: '#F5F0F0', nodeBg: '#F5F0F0', nodeText: '#181212', muted: 'rgba(245,240,240,0.7)', mutedText: '#837D7D', stroke: '#CDC8C8' };

  function assignColors(d, idx) {
    d._branchIdx = idx;
    if (d.children) d.children.forEach(function(c) { assignColors(c, idx); });
  }

  function scrollReveal(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)';
    var done = false;
    new IntersectionObserver(function(entries, obs) {
      if (entries[0].isIntersecting && !done) {
        done = true;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.disconnect();
      }
    }, { threshold: 0.1 }).observe(el);
  }

  function wrapText(text, maxWidth, fontSize) {
    var charW = fontSize * 0.58;
    var maxChars = Math.floor(maxWidth / charW);
    if (maxChars < 4) maxChars = 4;
    if (text.length <= maxChars) return [text];
    var words = text.split(' ');
    var lines = [];
    var line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (test.length > maxChars && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function createTreemap(containerId, data) {
    var el = document.getElementById(containerId);
    if (!el) return;

    if (data.children) data.children.forEach(function(c, i) { assignColors(c, i); });

    var grid = document.createElement('div');
    grid.className = 'ct-grid';
    el.appendChild(grid);

    var order = [
      'Why rethink?', 'Advanced features', 'Stakeholder needs',
      'Not working well', 'Technical restrictions', 'Speed to testing',
      'Users like', 'Missing features', 'Timeline'
    ];

    var branches = {};
    if (data.children) data.children.forEach(function(c) { branches[c.label] = c; });

    var withKids = [];
    var leafOnly = [];
    order.forEach(function(label, idx) {
      var branch = branches[label];
      if (branch && branch.children && branch.children.length) {
        withKids.push({ label: label, branch: branch, idx: idx });
      } else {
        leafOnly.push({ label: label, idx: idx });
      }
    });

    withKids.forEach(function(item) {
      grid.appendChild(makeCell(item.label, item.branch.children, item.idx, true));
    });

    if (leafOnly.length) {
      var leafRow = document.createElement('div');
      leafRow.className = 'ct-leaf-row';
      leafOnly.forEach(function(item) {
        var cell = makeCell(item.label, null, item.idx, false);
        cell.classList.add('ct-cell--leaf');
        leafRow.appendChild(cell);
      });
      grid.appendChild(leafRow);
    }

    function makeCell(label, children, branchIdx, expandable) {
      var c = COLORS[branchIdx % COLORS.length];
      var f = FILLS[branchIdx % FILLS.length];

      var cell = document.createElement('div');
      cell.className = 'ct-cell';
      cell.style.background = f;
      cell.style.borderColor = c;

      var header = document.createElement('div');
      header.className = 'ct-cell-header';
      header.textContent = label;
      cell.appendChild(header);

      if (children && children.length) {
        var count = document.createElement('span');
        count.className = 'ct-cell-count';
        count.textContent = children.length;
        header.appendChild(count);

        var list = document.createElement('ul');
        list.className = 'ct-cell-list';
        children.forEach(function(child) {
          var li = document.createElement('li');
          li.textContent = child.label;

          if (child.children && child.children.length) {
            li.className = 'ct-cell-expandable';
            li.style.cursor = 'pointer';

            var arrow = document.createElement('span');
            arrow.className = 'ct-cell-arrow';
            arrow.textContent = ' +' + child.children.length;
            li.appendChild(arrow);

            var subList = document.createElement('ul');
            subList.className = 'ct-cell-sublist ct-cell-sublist--collapsed';
            child.children.forEach(function(sub) {
              var subLi = document.createElement('li');
              subLi.textContent = sub.label;
              subList.appendChild(subLi);
            });
            li.appendChild(subList);

            li.addEventListener('click', function(e) {
              e.stopPropagation();
              var collapsed = subList.classList.toggle('ct-cell-sublist--collapsed');
              arrow.textContent = collapsed ? ' +' + child.children.length : ' −';
            });
          }

          list.appendChild(li);
        });
        cell.appendChild(list);
      }

      return cell;
    }

    scrollReveal(el);
  }

  function createTreemapOLD(containerId, data) {
    var el = document.getElementById(containerId);
    if (!el) return;

    if (data.children) data.children.forEach(function(c, i) { assignColors(c, i); });
    data._branchIdx = -1;

    var cw = Math.min(el.clientWidth || 800, 800);
    var ch = 800;
    var headerH = 38;
    var pad = 6;

    var narrowBranches = ['Missing features', 'Users like'];
    var wideBranches = ['Not working well', 'Advanced features', 'Technical restrictions', 'Timeline', 'Speed to testing'];

    function leafWeight(d) {

      var node = d;
      while (node.parent && node.parent.parent) node = node.parent;
      var branchLabel = node.label || '';
      if (narrowBranches.indexOf(branchLabel) >= 0) return 1;
      if (wideBranches.indexOf(branchLabel) >= 0) return 6;
      return 3;
    }

    function tagBranch(d, branch) {
      d._branch = branch || d.label;
      if (d.children) d.children.forEach(function(c) { tagBranch(c, d._branch === 'Design Re-work' ? c.label : d._branch); });
    }
    tagBranch(data, null);

    var branchTotals = {
      'Missing features': 1,
      'Users like': 1,
      'Why rethink?': 15,
      'Not working well': 15,
      'Advanced features': 15,
      'Stakeholder needs': 15,
      'Technical restrictions': 10,
      'Timeline': 10,
      'Speed to testing': 10
    };

    var root = d3.hierarchy(data)
      .sum(function(d) { return d.children ? 0 : 1; });

    if (root.children) {
      root.children.forEach(function(c) {
        var t = branchTotals[c.data.label];
        if (t !== undefined) c.value = t;
      });

      root.value = 0;
      root.children.forEach(function(c) { root.value += c.value; });
    }

    root.sort(function(a, b) { return b.value - a.value; });

    console.log('[treemap] Branch values:');
    root.children.forEach(function(c) { console.log('  ' + c.data.label + ': ' + c.value); });

    d3.treemap()
      .size([cw, ch])
      .paddingTop(headerH)
      .paddingInner(pad)
      .paddingOuter(pad)
      .round(true)(root);

    var svg = d3.select(el).append('svg')
      .attr('width', cw)
      .attr('height', ch)
      .attr('viewBox', '0 0 ' + cw + ' ' + ch)
      .style('font-family', "'UCity Pro', system-ui, sans-serif")
      .style('overflow', 'hidden')
      .style('display', 'block')
      .style('margin', '0 auto');

    var defs = svg.append('defs');
    var filter = defs.append('filter').attr('id', 'sketchy-' + containerId);
    filter.append('feTurbulence')
      .attr('type', 'turbulence')
      .attr('baseFrequency', '0.015')
      .attr('numOctaves', '4')
      .attr('seed', '2')
      .attr('result', 'noise');
    filter.append('feDisplacementMap')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'noise')
      .attr('scale', '3')
      .attr('xChannelSelector', 'R')
      .attr('yChannelSelector', 'G');

    var sketchFilter = 'url(#sketchy-' + containerId + ')';

    var currentFocus = root;

    var group = svg.append('g');

    render(root);
    scrollReveal(el);

    function render(focus) {
      var nodes = focus.children || [];

      group.selectAll('*').remove();

      if (focus !== root) {
        group.append('rect')
          .attr('x', 0).attr('y', 0)
          .attr('width', cw).attr('height', ch)
          .attr('fill', PAL.nodeBg)
          .attr('rx', 10)
          .style('cursor', 'pointer')
          .on('click', function() {
            currentFocus = focus.parent || root;
            render(currentFocus);
          });

        group.append('text')
          .attr('x', 14).attr('y', 20)
          .attr('font-size', '14px')
          .attr('font-weight', '600')
          .attr('fill', PAL.mutedText)
          .style('cursor', 'pointer')
          .text('← ' + (focus.parent === root ? 'Design Re-work' : focus.parent.data.label))
          .on('click', function() {
            currentFocus = focus.parent || root;
            render(currentFocus);
          });
      }

      var layoutNode = focus;

      if (focus !== root) {
        layoutNode = d3.hierarchy(focus.data)
          .sum(function(d) { return d.children ? 0 : 1; })
          .sort(function(a, b) { return b.value - a.value; });
      } else {

        layoutNode = root;
      }

      d3.treemap()
        .size([cw, ch - (focus !== root ? 36 : 0)])
        .paddingTop(headerH)
        .paddingInner(pad)
        .paddingOuter(pad + 2)
        .round(true)(layoutNode);

      var cells = layoutNode.children || [];
      var yOff = focus !== root ? 36 : 0;

      cells.forEach(function(cell) {
        var branchIdx = cell.data._branchIdx;
        var fill = branchIdx >= 0 ? FILLS[branchIdx % FILLS.length] : PAL.nodeBg;
        var stroke = branchIdx >= 0 ? COLORS[branchIdx % COLORS.length] : PAL.stroke;
        var hasKids = cell.children && cell.children.length;
        var cellW = cell.x1 - cell.x0;
        var cellH = cell.y1 - cell.y0;

        var g = group.append('g')
          .attr('transform', 'translate(' + cell.x0 + ',' + (cell.y0 + yOff) + ')')
          .style('cursor', hasKids ? 'pointer' : 'default');

        g.append('rect')
          .attr('width', cellW)
          .attr('height', cellH)
          .attr('rx', 16)
          .attr('fill', fill)
          .attr('stroke', stroke)
          .attr('stroke-width', 1.2)
          .attr('filter', sketchFilter)
          .style('transition', 'stroke-width 0.15s ease')
          .on('mouseenter', function() { d3.select(this).attr('stroke-width', 2); })
          .on('mouseleave', function() { d3.select(this).attr('stroke-width', 1.2); });

        var headerFont = 17;
        var headerLineH = headerFont + 6;
        var headerLines = wrapText(cell.data.label, cellW - 28, headerFont);
        headerLines.forEach(function(line, li) {
          g.append('text')
            .attr('x', 14)
            .attr('y', 20 + li * headerLineH)
            .attr('font-size', headerFont + 'px')
            .attr('font-weight', '600')
            .attr('fill', PAL.nodeText)
            .text(line);
        });
        var headerUsed = headerLines.length * headerLineH + 12;

        if (hasKids) {
          g.append('text')
            .attr('x', cellW - 14)
            .attr('y', 20)
            .attr('text-anchor', 'end')
            .attr('font-size', '12px')
            .attr('fill', PAL.mutedText)
            .text(cell.children.length);
        }

        if (cell.children) {
          var childFont = 17;
          var lineH = childFont + 6;
          var yPos = headerUsed + 10;
          var maxY = cellH - 14;

          for (var ci = 0; ci < cell.children.length; ci++) {
            if (yPos + lineH > maxY) {
              var remaining = cell.children.length - ci;
              if (remaining > 0) {
                g.append('text')
                  .attr('x', 14).attr('y', yPos).attr('dy', '0.8em')
                  .attr('font-size', '14px')
                  .attr('fill', PAL.mutedText)
                  .text('+' + remaining + ' more');
              }
              break;
            }
            var childLines = wrapText(cell.children[ci].data.label, cellW - 28, childFont);
            childLines.forEach(function(line, li) {
              if (yPos + lineH > maxY) return;
              g.append('text')
                .attr('x', 14).attr('y', yPos + li * lineH).attr('dy', '0.8em')
                .attr('font-size', childFont + 'px')
                .attr('font-weight', '400')
                .attr('fill', PAL.nodeText)
                .text(line);
            });
            yPos += childLines.length * lineH + 4;
          }
        }

        if (hasKids) {
          g.on('click', function() {

            var target = findNode(root, cell.data.label);
            if (target) {
              currentFocus = target;
              render(currentFocus);
            }
          });
        }
      });
    }

    function findNode(node, label) {
      if (node.data.label === label) return node;
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var found = findNode(node.children[i], label);
          if (found) return found;
        }
      }
      return null;
    }
  }

  function createTree(containerId, data, opts) {
    var el = document.getElementById(containerId);
    if (!el) return;

    opts = opts || {};
    var nodeH = opts.nodeH || 28;
    var depthGap = opts.depthGap || 220;
    var sibGap = opts.sibGap || 10;
    var collapseAt = opts.collapseAt != null ? opts.collapseAt : 3;

    if (data.children) data.children.forEach(function(c, i) { assignColors(c, i); });
    data._branchIdx = -1;

    var root = d3.hierarchy(data);
    root.x0 = 0; root.y0 = 0;

    function collapseDeep(d, depth) {
      if (d.children) {
        d.children.forEach(function(c) { collapseDeep(c, depth + 1); });
        if (depth >= collapseAt) { d._children = d.children; d.children = null; }
      }
    }
    collapseDeep(root, 0);

    var svg = d3.select(el).append('svg')
      .attr('width', '100%')
      .style('overflow', 'visible')
      .style('font-family', "'UCity Pro', system-ui, sans-serif");

    var g = svg.append('g').attr('transform', 'translate(40, 20)');

    var treeLayout = d3.tree()
      .nodeSize([nodeH + sibGap, depthGap])
      .separation(function(a, b) { return a.parent === b.parent ? 1 : 1.2; });

    var duration = 400;
    var i = 0;

    update(root);
    scrollReveal(el);

    function update(source) {
      treeLayout(root);
      var nodes = root.descendants();
      var links = root.links();

      var minY = Infinity, maxY = -Infinity;
      nodes.forEach(function(d) {
        if (d.x < minY) minY = d.x;
        if (d.x > maxY) maxY = d.x;
      });
      var h = maxY - minY + nodeH * 2 + 40;
      svg.transition().duration(duration).attr('height', h);
      g.transition().duration(duration).attr('transform', 'translate(40,' + (-minY + nodeH + 10) + ')');

      var node = g.selectAll('g.ct-node').data(nodes, function(d) { return d.id || (d.id = ++i); });

      var nodeEnter = node.enter().append('g')
        .attr('class', 'ct-node')
        .attr('transform', function() { return 'translate(' + source.y0 + ',' + source.x0 + ')'; })
        .style('opacity', 0)
        .style('cursor', function(d) { return d.children || d._children ? 'pointer' : 'default'; })
        .on('click', function(event, d) {
          if (d.children) { d._children = d.children; d.children = null; }
          else if (d._children) { d.children = d._children; d._children = null; }
          update(d);
        });

      nodeEnter.append('rect')
        .attr('x', 0).attr('y', -nodeH / 2)
        .attr('height', nodeH).attr('rx', 6).attr('ry', 6);

      nodeEnter.append('text')
        .attr('dy', '0.35em').attr('x', 10)
        .attr('font-size', function(d) { return d.depth === 0 ? '14px' : '12.5px'; })
        .attr('font-weight', function(d) { return d.depth <= 1 || (d.children || d._children) ? '600' : '400'; })
        .attr('fill', function(d) {
          if (d.depth === 0) return PAL.rootText;
          return d.data._branchIdx >= 0 ? '#181212' : PAL.nodeText;
        })
        .text(function(d) { return d.data.label; });

      nodeEnter.append('text')
        .attr('class', 'ct-indicator').attr('dy', '0.35em')
        .attr('font-size', '10px')
        .attr('fill', function(d) { return d.depth === 0 ? PAL.muted : PAL.mutedText; });

      var nodeUpdate = nodeEnter.merge(node);

      nodeUpdate.transition().duration(duration)
        .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })
        .style('opacity', 1);

      nodeUpdate.select('rect')
        .attr('width', function(d) { return estimateWidth(d); })
        .attr('fill', function(d) {
          if (d.depth === 0) return PAL.rootBg;
          var idx = d.data._branchIdx;
          return idx >= 0 ? FILLS[idx % FILLS.length] : PAL.nodeBg;
        })
        .attr('stroke', function(d) {
          if (d.depth === 0) return PAL.rootBg;
          var idx = d.data._branchIdx;
          return idx >= 0 ? COLORS[idx % COLORS.length] : PAL.stroke;
        })
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', function(d) {
          return !(d.children || d._children) && d.depth > 1 ? '3,2' : 'none';
        });

      nodeUpdate.selectAll('text:not(.ct-indicator)')
        .attr('fill', function(d) {
          if (d.depth === 0) return PAL.rootText;
          // Colored branch nodes keep a light pastel fill regardless of theme, so their text stays dark.
          return d.data._branchIdx >= 0 ? '#181212' : PAL.nodeText;
        });

      nodeUpdate.select('.ct-indicator')
        .attr('x', function(d) { return estimateWidth(d) - 16; })
        .attr('fill', function(d) { return d.depth === 0 ? PAL.muted : PAL.mutedText; })
        .text(function(d) {
          if (d._children) return '+' + d._children.length;
          if (d.children && d.depth > 0) return '−';
          return '';
        });

      nodeUpdate
        .on('mouseenter', function() {
          d3.select(this).select('rect').transition().duration(150)
            .attr('y', -nodeH / 2 - 1).attr('height', nodeH + 2);
        })
        .on('mouseleave', function() {
          d3.select(this).select('rect').transition().duration(150)
            .attr('y', -nodeH / 2).attr('height', nodeH);
        });

      node.exit().transition().duration(duration)
        .attr('transform', function() { return 'translate(' + source.y + ',' + source.x + ')'; })
        .style('opacity', 0).remove();

      var link = g.selectAll('path.ct-link').data(links, function(d) { return d.target.id; });

      link.enter().insert('path', 'g')
        .attr('class', 'ct-link').attr('fill', 'none').attr('stroke-width', 1.2)
        .attr('d', function() { var o = {x: source.x0, y: source.y0}; return diagonal(o, o); })
        .style('opacity', 0)
        .merge(link).transition().duration(duration)
        .attr('d', function(d) { return diagonal(d.source, d.target); })
        .attr('stroke', function(d) {
          var idx = d.target.data._branchIdx;
          return idx >= 0 ? COLORS[idx % COLORS.length] : '#CDC8C8';
        })
        .style('opacity', 0.5);

      link.exit().transition().duration(duration)
        .attr('d', function() { var o = {x: source.x, y: source.y}; return diagonal(o, o); })
        .style('opacity', 0).remove();

      nodes.forEach(function(d) { d.x0 = d.x; d.y0 = d.y; });
    }

    function diagonal(s, t) {
      var sy = s.y + estimateWidthFromNode(s);
      return 'M ' + sy + ' ' + s.x
        + ' C ' + (sy + t.y) / 2 + ' ' + s.x
        + ', ' + (sy + t.y) / 2 + ' ' + t.x
        + ', ' + t.y + ' ' + t.x;
    }

    function estimateWidth(d) {
      var len = d.data.label.length;
      var base = d.depth === 0 ? 8 : 6.8;
      var w = len * base + 20;
      if (d._children) w += 20;
      return Math.min(w, 340);
    }

    function estimateWidthFromNode(d) {
      return d.data ? estimateWidth(d) : 100;
    }
  }

  var D1 = { label: 'Design Re-work', children: [
    { label: 'Why rethink?', children: [
      { label: 'Wider use cases' },
      { label: 'Underlying systems' },
      { label: 'Product repositioning' },
      { label: 'IA & usability gaps' },
      { label: 'UI aesthetics' }
    ]},
    { label: 'Not working well', children: [
      { label: 'Hard to grasp UI patterns' },
      { label: 'Monolithic conversation' },
      { label: 'Can\'t document canvas' }
    ]},
    { label: 'Users like', children: [
      { label: 'Drag-n-drop' },
      { label: 'Ease of use', children: [{ label: 'Canvas smoothness' }] },
      { label: 'Usability' },
      { label: 'Components' },
      { label: 'Power', children: [{ label: 'Logic' }, { label: 'API' }, { label: 'Custom code' }] }
    ]},
    { label: 'Missing features', children: [
      { label: 'Unified response builder' },
      { label: 'Open/closed conversation UI' },
      { label: 'Conditional responses' },
      { label: 'Topics system' },
      { label: 'Q&A / single turn' },
      { label: 'Project creation', children: [{ label: 'NLP' }, { label: 'Channels' }, { label: 'CIO handoff' }] },
      { label: 'Attachments' },
      { label: 'Content mgmt', children: [
        { label: 'Interaction model', children: [{ label: 'Intents' }, { label: 'Entities' }, { label: 'Variables' }] }
      ]},
      { label: 'Custom styles' },
      { label: 'Canvas docs' },
      { label: 'Hide/show elements' },
      { label: 'Persona builder' },
      { label: 'Scripting view' }
    ]},
    { label: 'Stakeholder needs', children: [
      { label: 'Understand flow at a glance' },
      { label: 'Export for NLPs' },
      { label: 'Test & demo' },
      { label: 'Comments & collaboration' },
      { label: 'Review conversations' }
    ]},
    { label: 'Technical restrictions' },
    { label: 'Timeline' },
    { label: 'Advanced features', children: [
      { label: 'Slot filling' }, { label: 'Embedded NLU' },
      { label: 'Re-prompts' }, { label: 'Dialog mgmt' },
      { label: 'Open/closed conversation' }
    ]},
    { label: 'Speed to testing' }
  ]};

  var D2 = { label: 'Conversation', children: [
    { label: 'Topics', children: [
      { label: 'Turns', children: [
        { label: 'Technical', children: [{ label: 'Integration templates' }, { label: 'Connecting custom data' }] },
        { label: 'System output', children: [{ label: 'Carousel cards' }, { label: 'Attachment' }, { label: 'Message' }] },
        { label: 'User input', children: [{ label: 'Capturing variables in replies' }, { label: 'Open intent' }, { label: 'Commands' }, { label: 'Buttons' }] },
        { label: 'Display content', children: [{ label: 'APL' }, { label: 'Images' }, { label: 'Cards' }] },
        { label: 'Functional step', children: [{ label: 'Set variables' }, { label: 'Reusable components' }, { label: 'API calls' }, { label: 'Custom code' }] }
      ]},
      { label: 'Intents (trigger)', children: [{ label: 'Global' }, { label: 'Topic-related' }] },
      { label: 'Conditional gateways', children: [{ label: 'Random' }, { label: 'Conditions' }] }
    ]}
  ]};

  var D3 = { label: 'Message', children: [
    { label: 'Text', children: [
      { label: 'Text', children: [{ label: 'Markup' }, { label: 'Variables' }] },
      { label: 'Attachments', children: [{ label: 'Images' }, { label: 'Documents' }, { label: 'Carousel cards' }, { label: 'Audios' }, { label: 'Videos' }] },
      { label: 'Random variants' },
      { label: 'Conditions' }
    ]},
    { label: 'Voice', children: [
      { label: 'Speak', children: [{ label: 'Text-to-speech' }, { label: 'Voice selection' }, { label: 'Effect (SSML)' }] },
      { label: 'Attachments', children: [{ label: 'Audio files' }] },
      { label: 'Random variants' },
      { label: 'Conditions' }
    ]}
  ]};

  var SCHOLUB_PIPELINE = { label: 'Paper', children: [
    { label: 'Collect', children: [
      { label: 'arXiv metadata' },
      { label: 'PDF extract' }
    ]},
    { label: 'Filter', children: [
      { label: 'Reviewer (OpenAI)' },
      { label: 'User activity' }
    ]},
    { label: 'Enrich', children: [
      { label: 'Summary / translate' },
      { label: 'Tags' },
      { label: 'Thumbnail (Gemini)' }
    ]},
    { label: 'Publish', children: [
      { label: 'S3 + Postgres' },
      { label: 'Feed / recommend' }
    ]}
  ]};

  var SCHOLUB_SYSTEM = { label: 'Scholub', children: [
    { label: 'Clients', children: [
      { label: 'Frontend', children: [
        { label: 'Paper feed' },
        { label: 'AI search' },
        { label: 'Discussion' },
        { label: 'Profile' }
      ]},
      { label: 'Crawler', children: [
        { label: 'arXiv fetch' },
        { label: 'PDF download' },
        { label: 'Reviewer pass' }
      ]}
    ]},
    { label: 'Servers', children: [
      { label: 'NestJS API', children: [
        { label: 'Auth / users' },
        { label: 'Papers' },
        { label: 'Discussions' },
        { label: 'Notifications' }
      ]},
      { label: 'FastAPI LLM', children: [
        { label: 'Search papers' },
        { label: 'Summarize' },
        { label: 'Sub-agent' }
      ]}
    ]},
    { label: 'Infra', children: [
      { label: 'Postgres' },
      { label: 'S3' },
      { label: 'Redis' },
      { label: 'Models', children: [
        { label: 'Perplexity' },
        { label: 'Gemini' },
        { label: 'OpenAI' }
      ]}
    ]}
  ]};

  var SEOUL_PIPELINE = { label: 'Accident', children: [
    { label: 'Collect', children: [
      { label: 'TAAS bike accidents' },
      { label: 'OSM bike roads' }
    ]},
    { label: 'Clean', children: [
      { label: 'Coord convert' },
      { label: 'District / road match' }
    ]},
    { label: 'Enrich', children: [
      { label: 'On / off lane' },
      { label: 'Time / season' },
      { label: 'Blackspots' }
    ]},
    { label: 'Publish', children: [
      { label: 'insights JSON' },
      { label: 'Dashboard / map' }
    ]}
  ]};

  var SEOUL_SYSTEM = { label: 'Seoul Bike', children: [
    { label: 'Clients', children: [
      { label: 'Dashboard', children: [
        { label: 'KPI' },
        { label: 'Charts' },
        { label: 'Period filter' }
      ]},
      { label: 'Map', children: [
        { label: 'Accident points' },
        { label: 'Dedicated lanes' },
        { label: 'District layer' }
      ]},
      { label: 'AI insights', children: [
        { label: 'Intervention chat' },
        { label: 'Reference table' }
      ]}
    ]},
    { label: 'Pipeline', children: [
      { label: 'Python', children: [
        { label: 'TAAS fetch' },
        { label: 'Coord clean' },
        { label: 'Road match' },
        { label: 'Insights JSON' }
      ]}
    ]},
    { label: 'Data · models', children: [
      { label: 'Static JSON' },
      { label: 'OpenRouter', children: [
        { label: 'Gemini 3 Flash' }
      ]}
    ]}
  ]};

  createTreemap('researchTree', D1);
  createTree('blocksTree', D2, { depthGap: 240, sibGap: 10 });
  createTree('messageTree', D3, { depthGap: 240, sibGap: 10 });
  createTree('pipelineTree', SCHOLUB_PIPELINE, { depthGap: 240, sibGap: 10 });
  createTree('systemTree', SCHOLUB_SYSTEM, { depthGap: 240, sibGap: 10, collapseAt: 2 });
  var SLOP_PIPELINE = { label: 'Article', children: [
    { label: 'Parse', children: [
      { label: 'Page DOM / JSON' },
      { label: 'Text selection' }
    ]},
    { label: 'Generate', children: [
      { label: 'Summary / script' },
      { label: 'Shorts render' }
    ]},
    { label: 'Publish', children: [
      { label: 'S3 asset' },
      { label: 'Reels / panel' }
    ]}
  ]};

  var SLOP_SYSTEM = { label: 'SLOP', children: [
    { label: 'Clients', children: [
      { label: 'Extension', children: [
        { label: 'Floating button' },
        { label: 'Parse' },
        { label: 'Shorts panel' },
        { label: 'Inline rewrite' }
      ]},
      { label: 'Web', children: [
        { label: 'Onboarding' },
        { label: 'Reels' },
        { label: 'Search' },
        { label: 'Profile' }
      ]}
    ]},
    { label: 'Server', children: [
      { label: 'NestJS', children: [
        { label: 'Auth' },
        { label: 'Shorts' },
        { label: 'Files' },
        { label: 'Search' }
      ]}
    ]},
    { label: 'Infra', children: [
      { label: 'Prisma' },
      { label: 'S3' },
      { label: 'Redis' },
      { label: 'Meilisearch' },
      { label: 'OpenRouter' }
    ]}
  ]};

  createTree('seoulPipelineTree', SEOUL_PIPELINE, { depthGap: 240, sibGap: 10 });
  createTree('seoulSystemTree', SEOUL_SYSTEM, { depthGap: 240, sibGap: 10, collapseAt: 2 });
  createTree('slopPipelineTree', SLOP_PIPELINE, { depthGap: 240, sibGap: 10 });
  createTree('slopSystemTree', SLOP_SYSTEM, { depthGap: 240, sibGap: 10, collapseAt: 2 });

  var SAVEQUEST_PIPELINE = { label: 'Payment', children: [
    { label: 'Collect', children: [
      { label: 'Card charges' },
      { label: 'Merchant id' }
    ]},
    { label: 'Match', children: [
      { label: 'Category / store' },
      { label: 'User challenge' }
    ]},
    { label: 'Judge', children: [
      { label: 'Spend vs cap' },
      { label: 'Safe / danger / fail' }
    ]},
    { label: 'Reward', children: [
      { label: 'XP + coins' },
      { label: 'Ranking / shop' }
    ]}
  ]};

  var SAVEQUEST_SYSTEM = { label: 'SaveQuest', children: [
    { label: 'Clients', children: [
      { label: 'App', children: [
        { label: 'Home' },
        { label: 'Challenge' },
        { label: 'Shop' },
        { label: 'Profile' }
      ]}
    ]},
    { label: 'Server', children: [
      { label: 'Ingest', children: [
        { label: 'Payments' },
        { label: 'Merchants' }
      ]},
      { label: 'Engine', children: [
        { label: 'Limits' },
        { label: 'Status' },
        { label: 'Alerts' }
      ]},
      { label: 'Rewards', children: [
        { label: 'XP / coins' },
        { label: 'Ranking' },
        { label: 'Shop' }
      ]}
    ]},
    { label: 'Infra', children: [
      { label: 'User state' },
      { label: 'Payment log' },
      { label: 'Assets' }
    ]}
  ]};

  createTree('savequestPipelineTree', SAVEQUEST_PIPELINE, { depthGap: 240, sibGap: 10 });
  createTree('savequestSystemTree', SAVEQUEST_SYSTEM, { depthGap: 240, sibGap: 10, collapseAt: 2 });
})();
