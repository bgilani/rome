/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {FunctionHead, functionHead, AnyNode} from '@romejs/js-ast';
import {Generator} from '@romejs/js-generator';
import {printBindingPatternParams} from '../utils';

export default function FunctionHead(generator: Generator, node: AnyNode) {
  node = functionHead.assert(node);

  generator.multiline(node, (multiline, node) => {
    const {typeAnnotations} = generator.options;

    generator.print(node.typeParameters, node);
    generator.token('(');

    printBindingPatternParams(generator, node, node.params, node.rest, multiline);

    generator.token(')');

    if (typeAnnotations) {
      if (node.returnType) {
        generator.printTypeColon(node.returnType, node);
      }

      if (node.predicate) {
        if (!node.returnType) {
          generator.token(':');
        }
        generator.space();
        generator.print(node.predicate, node);
      }
    }
  }, {conditions: ['any-line-exceeds', 'more-than-one-line']});
}
